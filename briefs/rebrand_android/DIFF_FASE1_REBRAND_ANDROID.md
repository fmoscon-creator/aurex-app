# DIFF FASE 1 — Rebrand Android → Cobrex (código compartido) — 29-may-2026

> Para control de Escritorio (repo privado AurexApp no accesible → Code publica el diff).
> **Cambios:** brand.js (marca+URLs unificadas a Cobrex) + sacar balanza ⚖️/timer de los 5 headers + LiveIndicator (flag HIDE_HEADER_LEGAL). NADA compilado todavía.

```diff
diff --git a/src/components/LiveIndicator.js b/src/components/LiveIndicator.js
index 02a5d08..dec85f6 100644
--- a/src/components/LiveIndicator.js
+++ b/src/components/LiveIndicator.js
@@ -6,9 +6,10 @@
 // - Bilingüe ES↔EN usando useT()
 
 import React, { useState, useEffect } from 'react';
-import { View, Text, Platform } from 'react-native';
+import { View, Text } from 'react-native';
 import { useTheme } from '../lib/ThemeContext';
 import { useT } from '../lib/i18n';
+import { HIDE_HEADER_LEGAL } from '../lib/brand';
 
 export default function LiveIndicator({ lastUpdate }) {
   const { theme: C } = useTheme();
@@ -36,7 +37,7 @@ export default function LiveIndicator({ lastUpdate }) {
     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
       <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.green }} />
       <Text style={{ fontSize: 10, color: C.text, fontWeight: '600' }}>LIVE</Text>
-      {lastUpdate && Platform.OS !== 'ios' ? (
+      {lastUpdate && !HIDE_HEADER_LEGAL ? (
         <Text style={{ fontSize: 9, color: C.textSec, marginLeft: 4 }}>· {formatRelativeTime(lastUpdate)}</Text>
       ) : null}
     </View>
diff --git a/src/lib/brand.js b/src/lib/brand.js
index 9d283a3..ade52ba 100644
--- a/src/lib/brand.js
+++ b/src/lib/brand.js
@@ -1,18 +1,15 @@
 import { Platform } from 'react-native';
 
-// iOS muestra "Cobrex" (rebrand Apple Guideline 4.1c — "Aurex" choca con aurex.ai/Beinex).
-// Android sigue "AUREX" (app ya publicada y aprobada en Google Play v1.0.36).
-export const BRAND_NAME = Platform.OS === 'ios' ? 'Cobrex' : 'AUREX';
+// Rebrand unificado (Android → Cobrex, 29-may-2026): ambas plataformas muestran "Cobrex".
+// (Antes: iOS "Cobrex" / Android "AUREX". Ahora unificado.)
+export const BRAND_NAME = 'Cobrex';
 
-// iOS: se ocultan balanza y timer del header de las tabs para dar lugar al nombre.
-// Android queda igual (mantiene balanza y timer).
 export const IS_IOS = Platform.OS === 'ios';
 
-// iOS Build 36: migrado a cobrex.io (HTTPS verificado 27-may, cert Let's Encrypt).
-export const PRIVACY_URL = Platform.OS === 'ios'
-  ? 'https://cobrex.io/privacy.html'
-  : 'https://aurex.live/docs/privacy.html';
+// Balanza ⚖️ + timer FUERA de los headers de las tabs en AMBAS plataformas (quedan en Perfil "Aviso Legal").
+// Antes la balanza solo se ocultaba en iOS (vía IS_IOS); con el rebrand Android queda oculta también.
+export const HIDE_HEADER_LEGAL = true;
 
-export const TERMS_URL = Platform.OS === 'ios'
-  ? 'https://cobrex.io/terms.html'
-  : 'https://aurex.live/docs/terms.html';
+// URLs legales unificadas a cobrex.io (ambas plataformas).
+export const PRIVACY_URL = 'https://cobrex.io/privacy.html';
+export const TERMS_URL = 'https://cobrex.io/terms.html';
diff --git a/src/screens/AlertasScreen.js b/src/screens/AlertasScreen.js
index 74811a5..28809b7 100644
--- a/src/screens/AlertasScreen.js
+++ b/src/screens/AlertasScreen.js
@@ -28,7 +28,7 @@ const ALERT_ID_TO_BACKEND_TYPE = {
 };
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import AurexLogo from '../components/AurexLogo';
-import { BRAND_NAME, IS_IOS } from '../lib/brand';
+import { BRAND_NAME, HIDE_HEADER_LEGAL } from '../lib/brand';
 import LiveIndicator from '../components/LiveIndicator';
 import BellButton from '../components/BellButton';
 import { useNavigation, useFocusEffect } from '@react-navigation/native';
@@ -425,7 +425,7 @@ export default function AlertasScreen() {
           <Text style={{ fontSize: 13, color: C.textSec }}>{t('alertas')}</Text>
         </View>
         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingRight: 14 }}>
-          {!IS_IOS && (
+          {!HIDE_HEADER_LEGAL && (
           <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
             <Text style={{ fontSize: 14 }}>⚖️</Text>
             <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
diff --git a/src/screens/IAScreen.js b/src/screens/IAScreen.js
index abc1cad..997296f 100644
--- a/src/screens/IAScreen.js
+++ b/src/screens/IAScreen.js
@@ -7,7 +7,7 @@ import { SafeAreaView } from 'react-native-safe-area-context';
 import { supabase } from '../lib/supabase';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import AurexLogo from '../components/AurexLogo';
-import { BRAND_NAME, IS_IOS } from '../lib/brand';
+import { BRAND_NAME, HIDE_HEADER_LEGAL } from '../lib/brand';
 import LiveIndicator from '../components/LiveIndicator';
 import AssetLogo from '../components/AssetLogo';
 import BellButton from '../components/BellButton';
@@ -309,7 +309,7 @@ export default function IAScreen() {
             <Text style={{ fontSize: 13, color: '#E6EDF3' }} numberOfLines={1}>- {t('senales_ia')}</Text>
           </View>
           <View style={{ flexShrink: 0, alignItems: 'center', flexDirection: 'row', gap: 10 }}>
-            {!IS_IOS && (
+            {!HIDE_HEADER_LEGAL && (
             <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
               <Text style={{ fontSize: 14 }}>⚖️</Text>
               <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
diff --git a/src/screens/MercadosScreen.js b/src/screens/MercadosScreen.js
index ea5930c..fabe590 100644
--- a/src/screens/MercadosScreen.js
+++ b/src/screens/MercadosScreen.js
@@ -7,7 +7,7 @@ import {
 import { SafeAreaView } from 'react-native-safe-area-context';
 import Svg, { Path, Circle as SvgCircle, Line as SvgLine, G, Polyline } from 'react-native-svg';
 import AurexLogo from '../components/AurexLogo';
-import { BRAND_NAME, IS_IOS } from '../lib/brand';
+import { BRAND_NAME, HIDE_HEADER_LEGAL } from '../lib/brand';
 import AssetLogo from '../components/AssetLogo';
 import LiveIndicator from '../components/LiveIndicator';
 import BellButton from '../components/BellButton';
@@ -871,7 +871,7 @@ export default function MercadosScreen() {
           <Text style={st.headerSub}> {i18n('mercados')}</Text>
         </View>
         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingRight: 14 }}>
-          {!IS_IOS && (
+          {!HIDE_HEADER_LEGAL && (
           <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
             <Text style={{ fontSize: 14 }}>⚖️</Text>
             <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
diff --git a/src/screens/PortfolioScreen.js b/src/screens/PortfolioScreen.js
index 27a5bbd..c12938d 100644
--- a/src/screens/PortfolioScreen.js
+++ b/src/screens/PortfolioScreen.js
@@ -9,7 +9,7 @@ import { SafeAreaView } from 'react-native-safe-area-context';
 import { supabase } from '../lib/supabase';
 import { ALL_ASSETS } from '../lib/assets';
 import AurexLogo from '../components/AurexLogo';
-import { BRAND_NAME, IS_IOS } from '../lib/brand';
+import { BRAND_NAME, HIDE_HEADER_LEGAL } from '../lib/brand';
 import AssetLogo from '../components/AssetLogo';
 import LanguageButton from '../components/LanguageButton';
 import BellButton from '../components/BellButton';
@@ -692,7 +692,7 @@ export default function PortfolioScreen() {
             </View>
             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }}>
               <LanguageButton />
-              {!IS_IOS && (
+              {!HIDE_HEADER_LEGAL && (
               <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                 <Text style={{ fontSize: 14 }}>⚖️</Text>
                 <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
diff --git a/src/screens/WatchlistScreen.js b/src/screens/WatchlistScreen.js
index 839138e..f826c9c 100644
--- a/src/screens/WatchlistScreen.js
+++ b/src/screens/WatchlistScreen.js
@@ -8,7 +8,7 @@ import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
 import { supabase } from '../lib/supabase';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import AurexLogo from '../components/AurexLogo';
-import { BRAND_NAME, IS_IOS } from '../lib/brand';
+import { BRAND_NAME, HIDE_HEADER_LEGAL } from '../lib/brand';
 import AssetLogo from '../components/AssetLogo';
 import BellButton from '../components/BellButton';
 import AlertCreateModal from '../components/AlertCreateModal';
@@ -755,7 +755,7 @@ export default function WatchlistScreen() {
           <Text style={{ fontSize: 13, color: C.textSec }}>{t('watchlist')}</Text>
         </View>
         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
-          {!IS_IOS && (
+          {!HIDE_HEADER_LEGAL && (
           <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
             <Text style={{ fontSize: 14 }}>⚖️</Text>
             <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
```
