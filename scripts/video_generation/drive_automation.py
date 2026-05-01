#!/usr/bin/env python3
"""
Automatización Google Drive — sube/descarga archivos sin pasar por Descargas.

Resuelve el cuello de botella: Escritorio (Claude Desktop) genera videos en Kling,
descarga MP4, antes Fernando intermediaba para subirlos a Drive. Ahora Code los
sube/descarga directo con OAuth Desktop credentials de Google Drive API.

Por qué OAuth y no Service Account: las SA no tienen storage propio y no pueden
crear archivos en cuentas @gmail.com personales sin Google Workspace pago.
OAuth funciona con cuenta gratuita @gmail.com de Fernando.

Setup único:
1. OAuth Client ID (Desktop app) creado en Google Cloud Console
   (proyecto aurex-automation), JSON descargado a ~/Desktop/aurex-oauth.json.
2. Primera ejecución: `python3 drive_automation.py auth` — abre browser,
   Fernando autoriza con su Gmail una vez, refresh_token queda guardado en
   ~/.aurex/drive_token.json (persistente entre reboots; antes vivía en /tmp
   y se perdía cuando macOS limpiaba /tmp).
3. Siguientes ejecuciones: refresh_token se reutiliza automáticamente.

Uso CLI:

    # Listar archivos en una carpeta
    python3 drive_automation.py list 1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI

    # Subir archivo a una carpeta
    python3 drive_automation.py upload \\
        ~/Desktop/buho_v2_anim_01.mp4 1F2GSSSn7BfX-46kSKIZGzf3bVR08Rs_Q

    # Descargar archivo por ID
    python3 drive_automation.py download \\
        1BxXejxWJL2MIV9v8NYw0uTzD327KlWJp ./buho.mp4

Folder IDs útiles:
- AUREX_MEDIA_LIBRARY: 1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI
- 01_videos/buho_animaciones: 1F2GSSSn7BfX-46kSKIZGzf3bVR08Rs_Q
- 02_audios/elevenlabs: (a confirmar)
- 03_assets_brutos: 1gJxrY3sJHW8fMGsOsYRGcp-nM8GxTi8R
- 04_briefs: 1thKiCU2nXoUBj1isWY1e6h6uJPAuue2s
"""
import argparse
import io
import os
import sys
from pathlib import Path

from google.oauth2.credentials import Credentials as UserCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload

SCOPES = ["https://www.googleapis.com/auth/drive"]
# Token persistente en ~/.aurex/ (antes vivía en /tmp y se perdía con reboots de macOS).
TOKEN_PATH = Path.home() / ".aurex" / "drive_token.json"


def get_oauth_client_path() -> Path:
    """Busca el JSON del OAuth Client ID en los paths habituales."""
    env = os.environ.get("GOOGLE_OAUTH_CLIENT_JSON")
    if env and Path(env).exists():
        return Path(env)
    candidates = [
        Path("/tmp/aurex-oauth.json"),
        Path.home() / "Desktop" / "aurex-oauth.json",
    ]
    for p in candidates:
        try:
            if p.exists():
                return p
        except (PermissionError, OSError):
            continue
    sys.exit(
        "ERROR: no se encontró el JSON del OAuth Client.\n"
        "Esperado en uno de:\n"
        "  - env var GOOGLE_OAUTH_CLIENT_JSON\n"
        "  - /tmp/aurex-oauth.json\n"
        "  - ~/Desktop/aurex-oauth.json"
    )


def get_credentials():
    """Devuelve credenciales OAuth válidas. Si no hay token guardado, ejecuta el flow.
    Si el token existe pero está expirado, lo refresca con el refresh_token.
    """
    creds = None
    if TOKEN_PATH.exists():
        creds = UserCredentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if creds and creds.valid:
        return creds
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        TOKEN_PATH.parent.mkdir(parents=True, exist_ok=True)
        TOKEN_PATH.write_text(creds.to_json())
        return creds
    # No hay token o no se puede refrescar -> flow OAuth interactivo
    flow = InstalledAppFlow.from_client_secrets_file(str(get_oauth_client_path()), SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")
    TOKEN_PATH.parent.mkdir(parents=True, exist_ok=True)
    TOKEN_PATH.write_text(creds.to_json())
    print(f"[oauth] token guardado en {TOKEN_PATH}")
    return creds


def get_service():
    return build("drive", "v3", credentials=get_credentials(), cache_discovery=False)


def list_folder(folder_id: str):
    svc = get_service()
    q = f"'{folder_id}' in parents and trashed=false"
    results = svc.files().list(
        q=q,
        fields="files(id, name, mimeType, size, createdTime, modifiedTime)",
        pageSize=100,
        supportsAllDrives=True,
        includeItemsFromAllDrives=True,
    ).execute()
    files = results.get("files", [])
    print(f"=== {len(files)} archivos en folder {folder_id} ===")
    for f in files:
        size = f.get("size", "—")
        kind = "📁" if f["mimeType"] == "application/vnd.google-apps.folder" else "📄"
        print(f"  {kind} {f['name']:50s} {f['id']}  ({size} bytes)")


def upload_to_drive(local_path: str, parent_folder_id: str, name: str = None) -> str:
    """Sube un archivo local a la carpeta Drive especificada. Retorna el file_id."""
    svc = get_service()
    src = Path(local_path)
    if not src.exists():
        sys.exit(f"ERROR: no existe el archivo {local_path}")
    file_metadata = {
        "name": name or src.name,
        "parents": [parent_folder_id],
    }
    media = MediaFileUpload(str(src), resumable=True)
    print(f"[upload] {src.name} ({src.stat().st_size:,} bytes) -> folder {parent_folder_id}")
    try:
        f = svc.files().create(
            body=file_metadata,
            media_body=media,
            fields="id, name, webViewLink",
            supportsAllDrives=True,
        ).execute()
        print(f"[OK] subido. id={f['id']}  link={f.get('webViewLink')}")
        return f["id"]
    except HttpError as e:
        sys.exit(f"ERROR Drive API: {e}")


def download_from_drive(file_id: str, local_path: str):
    svc = get_service()
    out = Path(local_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    try:
        request = svc.files().get_media(fileId=file_id, supportsAllDrives=True)
        with open(out, "wb") as fh:
            downloader = MediaIoBaseDownload(fh, request, chunksize=10 * 1024 * 1024)
            done = False
            while not done:
                status, done = downloader.next_chunk()
                if status:
                    print(f"  descarga {int(status.progress() * 100)}%")
        print(f"[OK] descargado a {out} ({out.stat().st_size:,} bytes)")
    except HttpError as e:
        sys.exit(f"ERROR Drive API: {e}")


def main():
    parser = argparse.ArgumentParser(description="Automatización Google Drive con Service Account.")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_list = sub.add_parser("list", help="Listar archivos en un folder")
    p_list.add_argument("folder_id")

    p_up = sub.add_parser("upload", help="Subir archivo local a Drive")
    p_up.add_argument("local_path")
    p_up.add_argument("parent_folder_id")
    p_up.add_argument("--name", help="Nombre custom en Drive (default: nombre local)")

    p_dl = sub.add_parser("download", help="Descargar archivo de Drive por ID")
    p_dl.add_argument("file_id")
    p_dl.add_argument("local_path")

    p_ping = sub.add_parser("ping", help="Test de conectividad y credenciales")

    p_auth = sub.add_parser("auth", help="Ejecuta el flow OAuth interactivo (primera vez)")

    args = parser.parse_args()
    if args.cmd == "list":
        list_folder(args.folder_id)
    elif args.cmd == "upload":
        upload_to_drive(args.local_path, args.parent_folder_id, args.name)
    elif args.cmd == "download":
        download_from_drive(args.file_id, args.local_path)
    elif args.cmd == "ping":
        svc = get_service()
        about = svc.about().get(fields="user(emailAddress, displayName)").execute()
        print(f"OK conectado como: {about['user']['emailAddress']}  ({about['user']['displayName']})")
    elif args.cmd == "auth":
        # Forzar nuevo flow (borra token viejo si existe)
        if TOKEN_PATH.exists():
            TOKEN_PATH.unlink()
        get_credentials()
        print("OK auth completada. Token guardado.")


if __name__ == "__main__":
    main()
