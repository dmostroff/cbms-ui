/**
 * Vuetify3 Plugin
 */
import 'vuetify/styles'; // Ensure Vuetify styles are imported
import { createVuetify, type VuetifyOptions, type ThemeDefinition } from "vuetify";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi.mjs";

import '@mdi/font/css/materialdesignicons.css'; // Import MDI CSS
import "@fortawesome/fontawesome-free/css/all.css"

// import { mdi } from "vuetify/iconsets/mdi";

// Translations provided by Vuetify
import { en } from "vuetify/locale";

// Misc
// import { loadFonts } from '@/plugins/webfontloader'

/**
 * Vuetify Components
 *
 * @see {@link https://vuetifyjs.com/en/features/treeshaking/}
 */
const vuetifyConfig: VuetifyOptions = {
  components,
  directives,
  icons: {
    defaultSet: "mdi", // Specify MDI as the default icon set
    aliases,
    sets: {
      mdi,
      fa
    },
  },
  theme: {
    defaultTheme: "light",
  },
};
// Global configuration
// https://vuetifyjs.com/en/features/global-configuration/
/*
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
  */
/*
  // Icon Fonts
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  */
// Internationalization (i18n)
// https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
// locale: {
//   locale: 'en',
//   fallback: 'en',
//   messages: { en }
// },
// Theme
// https://vuetifyjs.com/en/features/theme/

// if (import.meta.env.DEV) {
//   // Disable treeshaking for DEV mode.
//   vConfig = {
//     // components: { components, labsComponents },
//     components,
//     directives,
//     ...vuetifyConfig
//   }
// }

const vuetify = createVuetify(vuetifyConfig);

export default vuetify;

// Export for test.
export { components, directives };
