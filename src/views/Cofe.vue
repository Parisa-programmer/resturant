<template>
  <v-app>
    <MenuCofe @changeSubject="getSubject($event)" />
    <v-main>

      <div class="mainDiv widthAll heightAll ">
        <v-app-bar color="" class="pr-0 fixed pl-12 ml-9 hideOver" dense style="z-index:2;top:0;right:0">
          <a href="https://ahuan.ir" target="blank" class="pr-0 relative">
            <img height="90" class="floatRight cursorPointer" src="../assets/img_341_1630839163.png" alt="صفحه اصلی" style="margin-right: -40px;">
            <span class="absolute red--text " style="right: -12px;top: 56px;font-size: 12px;    width: 120px;
">(لینک به صفحه اصلی)</span>
          </a>
          <v-spacer></v-spacer>
          <a href="https://instagram.com" target="blank">
            <v-btn icon>
              <v-icon large class="orange--text">mdi-instagram</v-icon>
            </v-btn>
          </a>
          <router-link to="/menu">
            <v-btn icon>
              <v-icon large class="red--text text--darken-2">mdi-arrow-left-circle</v-icon>
            </v-btn>
          </router-link>
        </v-app-bar>
        <Tabel :subject="subject" />
      </div>
    </v-main>
  </v-app>
</template>

<script>

import '../components/main.css'
import Tabel from '../components/Tabel.vue';
import MenuCofe from '../components/MenuCofe.vue';

export default {
  name: "App",
  components: {
    Tabel,
    MenuCofe
  },
  data: () => ({
    subject: 'پیش غذا'
  }),
  methods: {
    getSubject(event) {
      this.subject = event
    }
  },
};
</script>


