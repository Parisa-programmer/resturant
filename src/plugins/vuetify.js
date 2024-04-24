import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: 'md'
});

export default new Vuetify({
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   }
  // },
  theme: {
    themes: {
      light: {
        primary: '#101010',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
