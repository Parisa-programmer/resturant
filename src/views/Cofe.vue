<template>
  <div>
    <div style="z-index: 3333333333333">
      <MenuCofe
        @changeSubject="getSubject($event)"
        style="z-index: 3333333333333"
      />
    </div>
    <div
      style="z-index: 2222; top: 0; right: 0; padding-left: 49px"
      class="fixed widthAll relative"
    >
      <v-row class="white ml-12 hideOver" style="">
        <a href="https://ahuan.yek.link" target="blank" class="">
          <img
            height="68"
            class="cursorPointer"
            src="../assets/img_341_1630839163.png"
            alt="صفحه اصلی"
            style="margin-top: -10px"
          />
          <span
            class="absolute"
            style="right: 10px; top: 35px; font-size: 12px; color: #14179e"
            >(لینک به صفحه اصلی)</span
          >
        </a>
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn icon>
            <v-icon large class="mt-7 ml-4" color="#14179e"
              >mdi-arrow-left-circle</v-icon
            >
          </v-btn>
        </router-link>
      </v-row>
    </div>
    <div class="tabelParent">
      <Tabel :subject="subject" />
    </div>
  </div>
</template>

<style>
@media (min-width: 600px) {
  .tabelParent {
    z-index: 4;
    position: relative;
    padding-top: 50px;
    padding-right: 20px;
    padding-left: 120px;
  }
}
</style>

<script>
import "../components/main.css";
import Tabel from "../components/Tabel.vue";
import MenuCofe from "../components/MenuCofe.vue";

export default {
  name: "App",
  components: {
    Tabel,
    MenuCofe,
  },
  data: () => ({
    subject: "پیش غذا",
  }),
  methods: {
    getSubject(event) {
      this.subject = event;
    },
  },
  created() {
    document.title = "آهوان";
  },
};
</script>


