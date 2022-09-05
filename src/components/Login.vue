<template>
  <div>
    <v-img height="100%" width="100%" class="login-background fixed" src="../assets/login-background.png" />
    <div class="darkDiv justify-center align-center d-flex widthAll heightAll">
      <div class="loginBox pa-4 text-right rounded-lg">
        <h2 class="loginTitle d-inline-block">پنل ورود مدیریت</h2>
        <!-- <i class="loginIcon material-icons">login</i> -->
        <div>
          <label class="loginLabel" for="">نام کاربری:</label>
          <br>
          <v-text-field
            v-model="username"
            outlined
            clearable
          ></v-text-field>
        </div>
        <div>
          <label class="loginLabel" for="">رمز عبور:</label>
          <br>
          <v-text-field
            v-model="password"
            outlined
            clearable
          ></v-text-field>
          <!-- <input class="loginInut" type="text"> -->
        </div>
        <v-btn id="login" class="mdc-button mdc-button--raised float-left loginButton w-100">
          <span class="mdc-button__label px-6" @click="login">ورود</span>
        </v-btn>
      </div>
    </div>
    <!-- <div id="loading" class="loading h-100 w-100 justify-content-center align-items-center">...لطفا منتظر بمانید</div> -->
  </div>

</template>

<style>
  .loginButton{
  background: #ff8e13 !important;
  max-width: 100px;
}

.darkDiv{
  background-color: rgb(48 48 48 / 63%);
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
}

.loginBox{
  max-width: 500px;
  width: 80%;
  background-color: #ffffffd1;
  height: fit-content;
}

.loginTitle{
  margin-bottom: 30px;
  color: #ff8e13;
}

.loginLabel{
  color: #6b6b6b;
}

.loginIcon{
  color: #ff8e13;

}

.loginInut{
  width: 94%;
  border: 0 ;
  border-radius:4px;
  height: 40px;
  font-size: 25px;
  padding-left: 3%;
  padding-right: 3%;
  margin-bottom: 30px;
  margin-top: 10px;
}

@media screen and (min-width:300px) and (max-width:500px) {
  .loginBox{
    width: 100%;
  }
}
</style>

<script>  
  export default {
    name:'Login',
    props: {},
    data: () => ({
      username:'',
      password:''
    }),
    computed: {},
    watch: {},
    created() {},
    methods: {
      login(){
        localStorage.setItem('login',true)
      }
    },
  }
  </script>