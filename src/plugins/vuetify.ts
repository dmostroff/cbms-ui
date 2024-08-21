/**
 * Vuetify3 Plugin
 */
import { createVuetify, type VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import * as mdi from 'vuetify/iconsets/mdi'
import { mdi } from 'vuetify/iconsets/mdi'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as labsComponents from 'vuetify/labs/components'
// Translations provided by Vuetify
import { en } from 'vuetify/locale'

// Misc
// import { loadFonts } from '@/plugins/webfontloader'

// Styles
import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'

// await loadFonts()

/**
 * Vuetify Components
 *
 * @see {@link https://vuetifyjs.com/en/features/treeshaking/}
 */
const vuetifyConfig: VuetifyOptions = {
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      home: 'mdi-home',
      cart: 'mdi-cart',
      user: 'mdi-account'
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark'
  }
}
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

const vuetify = createVuetify(vuetifyConfig)

export default vuetify

// Export for test.
export { components, directives }
