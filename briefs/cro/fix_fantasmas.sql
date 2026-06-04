-- ============================================================================
-- FIX "usuarios fantasma" (auth.users sin fila en public.usuarios)
-- 🛑 PARA REVISIÓN — NO EJECUTAR sin OK de Fernando.
-- Autor: Code · 04-jun-2026 · contexto: briefs/cro/CODE_analisis.md §5
--
-- Estado verificado: 92 auth.users / 48 usuarios / 44 fantasmas
--   (29 reales + 15 prueba · 32 confirmaron mail + 12 no · 7 cargaron portfolio)
--   Backlog histórico Mar–May; no activo en junio.
--
-- ORDEN: (0) DRY-RUN para previsualizar → (1) TRIGGER permanente → (2) HEAL backlog → (3) VERIFICAR
-- Correr en: Supabase → SQL Editor.
-- ============================================================================


-- ============================================================================
-- (0) DRY-RUN — SOLO LECTURA. Corré esto PRIMERO para ver qué se va a tocar.
--     No escribe nada. Confirma los números antes de ejecutar lo demás.
-- ============================================================================

-- 0.a Conteo general
select
  (select count(*) from auth.users)                                              as auth_total,
  (select count(*) from public.usuarios)                                         as usuarios_total,
  (select count(*) from auth.users u
     left join public.usuarios p on p.id = u.id where p.id is null)              as fantasmas_total,
  (select count(*) from auth.users u
     left join public.usuarios p on p.id = u.id
     where p.id is null and u.email_confirmed_at is not null)                    as fantasmas_confirmados_a_healear,
  (select count(*) from auth.users u
     left join public.usuarios p on p.id = u.id
     where p.id is null and u.email_confirmed_at is null)                        as fantasmas_sin_confirmar_se_dejan;

-- 0.b Listado EXACTO de las filas que el HEAL crearía (los 32 confirmados).
--     Revisalo: estos son los id/email/fecha que se insertarían como FREE.
select u.id, u.email, u.created_at, u.last_sign_in_at
from auth.users u
left join public.usuarios p on p.id = u.id
where p.id is null
  and u.email_confirmed_at is not null
order by u.created_at;


-- ============================================================================
-- (1) TRIGGER PERMANENTE — cierra la causa (crea la fila sin depender de que la
--     app se reabra). VERSIÓN DEFINITIVA acordada Code+Escritorio:
--     crea la fila cuando el usuario queda CONFIRMADO — ya sea porque confirmó
--     el mail (UPDATE) o porque se registró ya confirmado (INSERT: login Apple/
--     Google, o si en el futuro se apaga la confirmación de mail).
--       • LIMPIO  → no crea filas de cuentas que nunca se confirman (lo que pidió Escritorio).
--       • ROBUSTO → anda con confirmación ON, OFF y con SSO Apple/Google a futuro.
--       • COHERENTE → mismo criterio que el heal (excluye a los 12 no confirmados).
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.email_confirmed_at is not null then
    insert into public.usuarios (id, email, plan, created_at)
    values (new.id, new.email, 'FREE', coalesce(new.created_at, now()))
    on conflict (id) do nothing;   -- idempotente: si ya existe, no toca nada
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_ready on auth.users;
create trigger on_auth_user_ready
  after insert or update of email_confirmed_at on auth.users
  for each row execute function public.handle_new_user();

-- ── Alternativas descartadas (documentadas por si se cambia el criterio) ──
--   A) crear SIEMPRE al registrarse, incluso sin confirmar → robusto pero deja
--      filas "ruido" de cuentas nunca confirmadas. (quitar el IF + trigger "after insert")
--   B) crear SOLO al confirmar el mail (after update ...) → limpio pero NO cubre
--      SSO Apple/Google (esos se confirman en el INSERT). La versión de arriba = B
--      + cobertura de SSO, por eso se eligió.


-- ============================================================================
-- (2) HEAL BATCH — limpia el backlog histórico.
--     Crea la fila SOLO para los fantasmas que CONFIRMARON el mail (32).
--     Los 12 sin confirmar se dejan como están (nunca completaron registro válido).
--     Cada uno queda con su created_at REAL (preserva su antigüedad).
--     Los 7 que cargaron portfolio son un subconjunto de estos 32 → quedan healeados
--     automáticamente con su fecha real (su actividad en 'portfolio' ya estaba guardada).
-- ============================================================================

insert into public.usuarios (id, email, plan, created_at)
select u.id, u.email, 'FREE', u.created_at
from auth.users u
left join public.usuarios p on p.id = u.id
where p.id is null
  and u.email_confirmed_at is not null
on conflict (id) do nothing;


-- ============================================================================
-- (3) VERIFICACIÓN post-ejecución — debería dar fantasmas_confirmados = 0.
-- ============================================================================

select
  (select count(*) from auth.users)                                              as auth_total,
  (select count(*) from public.usuarios)                                         as usuarios_total,
  (select count(*) from auth.users u
     left join public.usuarios p on p.id = u.id
     where p.id is null and u.email_confirmed_at is not null)                    as fantasmas_confirmados_restantes,  -- esperado: 0
  (select count(*) from auth.users u
     left join public.usuarios p on p.id = u.id
     where p.id is null and u.email_confirmed_at is null)                        as fantasmas_sin_confirmar_restantes; -- esperado: 12 (intacto)

-- 3.b (sugerencia de Escritorio) — además del conteo, listar los fantasmas
--     CONFIRMADOS que queden: para una auditoría limpia debe devolver 0 filas.
select u.id, u.email, u.created_at
from auth.users u
left join public.usuarios p on p.id = u.id
where p.id is null
  and u.email_confirmed_at is not null
order by u.created_at;   -- esperado: 0 filas

-- (opcional) Listar los 7 con actividad de portfolio, por si se los quiere
-- contactar/re-engagar más adelante (no es parte del fix, es info de negocio):
-- select distinct pf.user_id, u.email
-- from public.portfolio pf
-- join auth.users u on u.id = pf.user_id
-- left join public.usuarios us on us.id = pf.user_id
-- where us.id is null;   -- (correr ANTES del heal; después del heal ya tendrán fila)
