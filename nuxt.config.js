import fs from 'fs'
import colors from 'vuetify/es5/util/colors'

/** 変数取り出し */
const { PROCESS, PROCESS_NAME, SYSTEM_TITLE, BASE_PATH, BUILD_DIR, API_PATH } =
  process.env
/** version をセット(値を変えることで処理中でも強制再読み込みする) */
const verNum = '0.0.1.1'
// versionファイルを作成
fs.writeFileSync('static/ver.json', JSON.stringify({ ver: verNum }))

export default {
  publicRuntimeConfig: {
    BASE_PATH, // ベースパス
    VER: verNum, // version
    PROCESS, // プロセス
    PROCESS_NAME, // プロセス名
    SYSTEM_TITLE, // システムタイトル
    API_PATH, // APIのベースURL
  },
  privateRuntimeConfig: {},

  // router (ベースURLを指定。middlewareを指定)
  router: {
    base: '/PartsMaster',
    middleware: ['dark', 'fujitecSso','headerInfo'],
  },

  // server (すべてのIPからアクセス可。)
 /*
  server: {
    host: '0.0.0.0',
  },
  */
  // ビルドの出力先
  generate: {
    dir: BUILD_DIR,
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - PartsMaster',
    title: 'PartsMaster',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    base:{
      href: 'router.base',
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{
    src: '@/plugins/vue-js-xlsx.js',
    ssr: false,
  }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '@/plugins/vue-js-xlsx.js',
    ssr: false
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
  },

  proxy: {
    '/api/':{
      target:'http://localhost:59272',
      pathRewrite:{'^/api':'/'}
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
