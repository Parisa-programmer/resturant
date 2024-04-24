<template>
  <v-app id="app">
    <!-- header -->
    
    <!-- main -->
    <v-main class="mt-2" style="min-height: 80vh">
      <router-view />
    </v-main>
    <!-- footer -->
  </v-app>
</template>
<script setup>
import { RouterView } from "vue-router";
</script>

<script>
// import HelloWorld from './components/HelloWorld';


export default {
  name: "App",

  components: {
    // HelloWorld,
   
  },

  data: () => ({
    isLogout: false,
    isOpenLogin: false,
  }),
  methods: {
    openLogin() {
      if (!localStorage.getItem("lName")) {
        this.isOpenLogin = !this.isOpenLogin;
      }
    },
    logOut() {
      this.isLogout = true;
      console.log(localStorage);
      console.log("logOut...");
    },
  },
};
</script>
