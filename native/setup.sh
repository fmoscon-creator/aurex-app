#!/bin/bash
# Script para copiar archivos nativos a AurexApp
DEST=~/AurexApp

echo "Copiando archivos..."
mkdir -p $DEST/src/screens $DEST/src/navigation $DEST/src/lib

curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/screens/PortfolioScreen.js -o $DEST/src/screens/PortfolioScreen.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/screens/MercadosScreen.js -o $DEST/src/screens/MercadosScreen.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/screens/IAScreen.js -o $DEST/src/screens/IAScreen.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/screens/AlertasScreen.js -o $DEST/src/screens/AlertasScreen.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/screens/PerfilScreen.js -o $DEST/src/screens/PerfilScreen.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/src/navigation/TabNavigator.js -o $DEST/src/navigation/TabNavigator.js
curl -s https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/native/App.js -o $DEST/App.js

echo "Listo! Todos los archivos copiados."
