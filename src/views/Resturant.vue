<template>
  <v-app>
    
    <v-main >
      <MenuSite @changeSubject="getSubject($event)"  style="z-index:2" />
      <div class="mainDiv widthAll heightAll" >
        <Tabel :subject="subject" style="z-index:3" />
      </div>
    </v-main>
  </v-app>
</template>

<script>

import '../components/main.css'
import MenuSite from '../components/MenuSite.vue';
import Tabel from '../components/Tabel.vue';

export default {
  name: "App",
  components: {
    MenuSite,
    Tabel,
  },
  data: () => ({
    subject: 'پیش غذا'
  }),
  methods: {
    getSubject(event) {
      this.subject = event
    }
  }
};
</script>


