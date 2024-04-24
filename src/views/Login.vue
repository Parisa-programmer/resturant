<template>
  <div class="widthAll heightAll">
    <v-img style="min-height:100%" height="100%" width="100%" class="login-background fixed"
      src="../assets/login-background.png" />
    <div class="darkDiv justify-center align-center d-flex widthAll heightAll">
      <div class="loginBox pa-4 text-right rounded-lg">
        <h2 class="loginTitle d-inline-block rokh" style="color:#14179e">پنل ورود مدیریت</h2>
        <div>
          <v-text-field v-model="username" outlined label="نام کاربری"></v-text-field>
        </div>
        <div>
          <v-text-field v-model="password" outlined label="رمز عبور"></v-text-field>
        </div>
        <span class="red--text text--darken-1" v-if="alert">{{alertText}}</span>
        <v-btn dark class="float-left px-6" color="#14179e" @click="login" >
          ورود
        </v-btn>
      </div>
    </div>
    <AlertText v-if="alert" :text='alertText'  />
  </div>

</template>

<style>
.loginButton {
  background: #ff8e13 !important;
  max-width: 100px;
}

.darkDiv {
  background-color: rgb(48 48 48 / 63%);
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
}

.loginBox {
  max-width: 500px;
  width: 80%;
  background-color: #ffffffd1;
  height: fit-content;
}

.loginTitle {
  margin-bottom: 30px;
  color: #ff8e13;
}

.loginLabel {
  color: #6b6b6b;
}

.loginIcon {
  color: #ff8e13;

}

.loginInut {
  width: 94%;
  border: 0;
  border-radius: 4px;
  height: 40px;
  font-size: 25px;
  padding-left: 3%;
  padding-right: 3%;
  margin-bottom: 30px;
  margin-top: 10px;
}

</style>

<script>
import "../components/main.css";
import AlertText from "../components/AlertText.vue";
export default {
  name: "Login",
  props: {},
  data: () => ({
    username: "",
    password: "",
    alert: false,
    alertText: ''
  }),
  computed: {},
  watch: {},
  created() { },
  methods: {
    login() {
      if (this.username == "admin" && this.password == "admin") {
        localStorage.setItem('login', true)
        localStorage.setItem('isAddmin', true)
        this.$router.push('/')
      }
      else {
        this.alert = true
        this.alertText = 'نام کاربری یا رمز عبور اشتباه است.'
        setTimeout(() => {
          this.alert = false
        }, 3000);
      }
    }
  },
  components: { AlertText }
}
</script>