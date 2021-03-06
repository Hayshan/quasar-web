// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'icons'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QAvatar',
        'QBadge',
        'QBtn', 'QBtnDropdown', 'QBtnGroup', 'QBtnToggle',
        'QCard', 'QCardSection', 'QCardActions',
        'QCarousel', 'QCarouselControl', 'QCarouselSlide',
        'QCheckbox',
        'QColor',
        'QDate',
        'QDialog',
        'QDrawer',
        'QEditor',
        'QExpansionItem',
        'QField',
        'QForm',
        'QFooter',
        'QHeader',
        'QIcon',
        'QInput',
        'QInfiniteScroll',
        'QInnerLoading',
        'QImg',
        'QItem', 'QItemSection', 'QItemLabel',
        'QLayout',
        'QList',
        'QLinearProgress',
        'QMarkupTable',
        'QMenu',
        'QOptionGroup',
        'QPage',
        'QPageContainer',
        'QPagination',
        'QRadio',
        'QRating',
        'QRouteTab',
        'QSelect',
        'QSeparator',
        'QSlider',
        'QSlideItem',
        'QSpace',
        'QScrollArea',
        'QStepper', 'QStep', 'QStepperNavigation',
        'QTabs', 'QTabPanels', 'QTabPanel',
        'QTable', 'QTh', 'QTr', 'QTd',
        'QTimeline', 'QTimelineEntry',
        'QToggle',
        'QToolbar', 'QToolbarTitle',
        'QTooltip',
        'QTree'
      ],

      directives: [
        'ClosePopup',
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'LocalStorage',
        'Notify'
      ]
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      chainWebpack (chain, { isServer, isClient }) {
        chain.resolve.alias
          .set('vue$', 'vue/dist/vue.esm.js')
        chain.resolve.alias
          .set('@', resolve('./src'))
        chain.resolve.alias
          .set('~', resolve('./node_modules'))
        chain.module.rule('eslint')
          .test(/\.(js|vue)$/)
          .enforce('pre')
          .exclude.add((/[\\/]node_modules[\\/]/))
          .end()
          .use('eslint-loader')
          .loader('eslint-loader')
        chain.module
          .rule('images')
          .exclude.add(resolve('src/icons'))
          .end()
        chain.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'svg-icon-[name]'
          })
          .end()
      }
      // extendWebpack (cfg) {
      //   cfg.resolve.alias = {
      //     // 添加现有的别名
      //     ...cfg.resolve.alias,
      //     // 添加自己的别名
      //     vue$: 'vue/dist/vue.esm.js',
      //     '@': resolve('./src'),
      //     '~': resolve('./node_modules')
      //   }
      //   cfg.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /node_modules/,
      //     options: {
      //       formatter: require('eslint').CLIEngine.getFormatter('stylish')
      //     }
      //   })
      //   cfg.module.rules[2].exclude = [resolve('./src/icons')]
      //   cfg.module.rules.push({
      //     test: /\.svg$/,
      //     include: [resolve('./src/icons')],
      //     use: [
      //       {
      //         loader: 'svg-sprite-loader',
      //         options: {
      //           symbolId: 'svg-icon-[name]'
      //         }
      //       }
      //     ]
      //   })
      // }
    },

    devServer: {
      // https: true,
      port: 8181,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar App',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-web'
      }
    }
  }
}
