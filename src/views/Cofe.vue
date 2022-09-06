<template>
  <v-app>
    <MenuCofe @changeSubject="getSubject($event)" />
    <v-main>
      <div class="mainDiv widthAll heightAll ">
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


