# DIFF FASE 2 — Rebrand Android → Cobrex (nativo) — 29-may-2026

> Control de Escritorio. Cambios de CÓDIGO (abajo el diff) + IMÁGENES regeneradas (binarias, no se diffean → ver carpeta img_fase2/).

## Cambios de código:
- strings.xml: app_name AUREX → Cobrex
- MainActivity.kt: fix crash react-native-screens (override onCreate(null))
- TabNavigator.js: toolbar S24 (fontSize 9→8 + tabBarAllowFontScaling:false)
- build.gradle: versionCode 36→37, versionName 1.0.36→1.0.37

## Imágenes regeneradas a Cobrex (ver img_fase2/):
- Ícono launcher (10 PNGs: ic_launcher + ic_launcher_round × 5 densidades) = símbolo dorado SIN texto (idéntico a iOS). Antes: tenía 'AUREX'.
- Ícono ficha 512 (para Play Console) = símbolo limpio.
- Bootsplash (5 PNGs: logo + @1,5x/@2x/@3x/@4x) = Cobrex (símbolo + 'COBREX'), idéntico al bootsplash de iOS. Antes: 'AUREX'.

```diff
diff --git a/android/app/build.gradle b/android/app/build.gradle
index baf1272..b9e4e68 100644
--- a/android/app/build.gradle
+++ b/android/app/build.gradle
@@ -84,8 +84,8 @@ android {
         applicationId "com.aurexapp"
         minSdkVersion rootProject.ext.minSdkVersion
         targetSdkVersion rootProject.ext.targetSdkVersion
-        versionCode 36
-        versionName "1.0.36"
+        versionCode 37
+        versionName "1.0.37"
     }
     signingConfigs {
         debug {
diff --git a/android/app/src/main/java/com/aurexapp/MainActivity.kt b/android/app/src/main/java/com/aurexapp/MainActivity.kt
index 97ec00c..8749258 100644
--- a/android/app/src/main/java/com/aurexapp/MainActivity.kt
+++ b/android/app/src/main/java/com/aurexapp/MainActivity.kt
@@ -1,5 +1,6 @@
 package com.aurexapp
 
+import android.os.Bundle
 import com.facebook.react.ReactActivity
 import com.facebook.react.ReactActivityDelegate
 import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
@@ -7,6 +8,12 @@ import com.facebook.react.defaults.DefaultReactActivityDelegate
 
 class MainActivity : ReactActivity() {
 
+  // Fix crash react-native-screens al restaurar la app desde background (Build 37 Android):
+  // pasar null a super.onCreate evita que Android intente restaurar Fragments de RN-screens.
+  override fun onCreate(savedInstanceState: Bundle?) {
+    super.onCreate(null)
+  }
+
   /**
    * Returns the name of the main component registered from JavaScript. This is used to schedule
    * rendering of the component.
diff --git a/android/app/src/main/res/values/strings.xml b/android/app/src/main/res/values/strings.xml
index 9eafc96..1fa9595 100644
--- a/android/app/src/main/res/values/strings.xml
+++ b/android/app/src/main/res/values/strings.xml
@@ -1,4 +1,4 @@
 <resources>
-    <string name="app_name">AUREX</string>
+    <string name="app_name">Cobrex</string>
     <string name="default_notification_channel_id" translatable="false">aurex_default</string>
 </resources>
diff --git a/src/navigation/TabNavigator.js b/src/navigation/TabNavigator.js
index a48490c..3583b2a 100644
--- a/src/navigation/TabNavigator.js
+++ b/src/navigation/TabNavigator.js
@@ -21,7 +21,8 @@ export default function TabNavigator() {
         tabBarStyle: { backgroundColor: '#161B22', borderTopColor: '#21262D', borderTopWidth: 0.5, paddingTop: 4 },
         tabBarActiveTintColor: '#D4A017',
         tabBarInactiveTintColor: '#8B949E',
-        tabBarLabelStyle: { fontSize: 9, marginTop: 1 },
+        tabBarLabelStyle: { fontSize: 8, marginTop: 1 },
+        tabBarAllowFontScaling: false,
       }}
     >
       <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ tabBarLabel: t('portfolio'), tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💼</Text> }} />
```
