import { Platform } from 'react-native';

// iOS muestra "Cobrex" (rebrand Apple Guideline 4.1c — "Aurex" choca con aurex.ai/Beinex).
// Android sigue "AUREX" (app ya publicada y aprobada en Google Play v1.0.36).
export const BRAND_NAME = Platform.OS === 'ios' ? 'Cobrex' : 'AUREX';

// iOS: se ocultan balanza y timer del header de las tabs para dar lugar al nombre.
// Android queda igual (mantiene balanza y timer).
export const IS_IOS = Platform.OS === 'ios';

export const PRIVACY_URL = Platform.OS === 'ios'
  ? 'https://aurex.live/docs/privacy-cobrex.html'
  : 'https://aurex.live/docs/privacy.html';

export const TERMS_URL = Platform.OS === 'ios'
  ? 'https://aurex.live/docs/terms-cobrex.html'
  : 'https://aurex.live/docs/terms.html';
