<template>
  <div class="widthAll">
    <div style="z-index: 3333333333333">
      <MenuSite
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
      <!-- <div class="widthAll" style="padding-left: 29px">
      <div class="white widthAll">
        <v-row
          class=" white pr-1 fixed hideOver"
          style="z-index: 222; top: 0; right: 0;"
        >
          <a href="https://ahuan.yek.link" target="blank" class="pr-0 relative">
            <img
              height="68"
              class="cursorPointer mb-3"
              src="../assets/img_341_1630839163.png"
              alt="صفحه اصلی"
              style="margin-top: -10px; margin-right: -10px"
            />
            <span
              class="absolute rokh mt-1"
              style="
                right: 0;
                top: 40px;
                font-size: 12px;
                width: 120px;
                color: #14179e;
              "
            >
              (لینک به صفحه اصلی)
            </span>
          </a>
          <v-spacer></v-spacer>
          <router-link to="/">
            <v-btn icon class="mt-5" style="margin-left: 110px">
              <v-icon large class="" color="#14179e"
                >mdi-arrow-left-circle</v-icon
              >
            </v-btn>
          </router-link>
        </v-row>
      </div>
      <div style="z-index: 22222222222222">
        <MenuSite @changeSubject="getSubject($event)" />
      </div> -->
    </div>

    <!-- <v-main> -->
    <!-- <div class="mainDiv widthAll heightAll">
        <Tabel :subject="subject" />
      </div> -->
    <!-- </v-main> -->
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
import MenuSite from "../components/MenuSite.vue";
import Tabel from "../components/Tabel.vue";

export default {
  name: "App",
  components: {
    MenuSite,
    Tabel,
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


