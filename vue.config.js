const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './',
  configureWebpack: {
    plugins: [
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },
  devServer: {
    proxy: {
      '/cookie/': {
        target: 'http://37.152.166.70:9101',
        pathRewrite: { '^/cookie': '' },
        secure: false
      },
      '/weatherproxy/': {
        target: 'https://api.openweathermap.org/',
        pathRewrite: { '^/weatherproxy': '' },
        secure: false
      },
      '/panel/': {
        target: 'https://panel.ahuantours.com/api/',
        pathRewrite: { '^/panel': '' },
        secure: false
      },
      '/ata/': {
        target: 'http://api.ataair.ir/ws1/',
        pathRewrite: { '^/ata': '' },
        secure: false
      },
      '/kishair/': {
        target: 'http://api.kishair.aero/ws1',
        pathRewrite: { '^/kishair': '' },
        secure: false
      },
      '/qeshmair/': {
        target: 'http://api.qeshm-air.com/ws1',
        pathRewrite: { '^/qeshmair': '' },
        secure: false
      },
      '/caspian/': {
        target: 'http://iv.nirasoft.ir:882',
        pathRewrite: { '^/caspian': '' },
        secure: false
      },
      '/taban/': {
        target: 'http://HH.nirasoft.ir:882',
        pathRewrite: { '^/taban': '' },
        secure: false
      },
      '/saha/': {
        target: 'https://api.sahaair.com/ws1',
        pathRewrite: { '^/saha': '' },
        secure: false
      },
      '/aseman/': {
        target: 'http://restapi.iaa.ir/ws1',
        pathRewrite: { '^/aseman': '' },
        secure: false
      },
      '/zagros/': {
        target: 'http://Zv.nirasoft.ir:882',
        pathRewrite: { '^/zagros': '' },
        secure: false
      },
      '/naft/': {
        target: 'http://api.karunair.ir/ws1',
        pathRewrite: { '^/naft': '' },
        secure: false
      },
      '/meraj/': {
        target: 'http://restapi.meraj.aero/ws1',
        pathRewrite: { '^/meraj': '' },
        secure: false
      },
      '/varesh/': {
        target: 'http://VR.nirasoft.ir:882',
        pathRewrite: { '^/varesh': '' },
        secure: false
      },
      '/flyPersia/': {
        target: 'http://api.flypersia.aero/ws1',
        pathRewrite: { '^/flyPersia': '' },
        secure: false
      },
      // ___________________________________________________________________________
      '/varesh2/': {
        target: 'http://VR.nirasoft.ir:880/cgi-bin/NRSWebWS.cgi',
        pathRewrite: { '^/varesh2': '' },
        secure: false
      },
      '/aseman2/': {
        target: 'http://restapi.iaa.ir/ws2/cgi-bin/NRSWEB.cgi ',
        pathRewrite: { '^/aseman2': '' },
        secure: false
      },
      '/taban2/': {
        target: 'http://hh.nirasoft.ir:880/cgi-bin/NRSWebWS.cgi',
        pathRewrite: { '^/taban2': '' },
        secure: false
      },
      '/caspian2/': {
        target: 'http://iv.nirasoft.ir:880/cgi-bin/NRSWeb.cgi',
        pathRewrite: { '^/caspian2': '' },
        secure: false
      },
      '/ata2/': {
        target: 'http://api.ataair.ir/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/ata2': '' },
        secure: false
      },
      '/saha2/': {
        target: 'http://api.sahaair.com/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/saha2': '' },
        secure: false
      },
      '/meraj2/': {
        target: 'http://restapi.meraj.aero/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/meraj2': '' },
        secure: false
      },
      '/naft2/': {
        target: 'http://api.karunair.ir/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/naft2': '' },
        secure: false
      },
      '/qeshmair2/': {
        target: 'http://api.qeshm-air.com/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/qeshmair2': '' },
        secure: false
      },
      '/kishair2/': {
        target: 'http://api.kishair.aero/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/kishair2': '' },
        secure: false
      },
      '/zagros2/': {
        target: 'http://book.zagrosairlines.com/cgi-bin/NRSWeb.cgi',
        pathRewrite: { '^/zagros2': '' },
        secure: false
      },
      '/flyPersia2/': {
        target: 'http://api.flypersia.aero/ws2/cgi-bin/NRSWEB.cgi',
        pathRewrite: { '^/flyPersia2': '' },
        secure: false
      },
    }
  },
})
