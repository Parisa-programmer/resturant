<template>
  <div>
    <v-img id="cover" :src="subject == 'پیش غذا' ? require('../assets/saladBackground.png') : subject == 'غذای اصلی' ? require('../assets/maincourse.jpg')
      : subject == 'کباب' ? require('../assets/kababBackground.png')
        : subject == 'نوشیدنی و مخلفات' ? require('../assets/drinkbackground.png')
    : ''"></v-img>

    <div id="m6_menu" style="left:0;">
      <div class="menu-bar" :style="{maxHeight: isAddmin ? '80%' : '100%'}">
        <div @click="changeMenu('پیش غذا')" class="m6_cat" id="menu_1"><img src="../assets/soap.png"><span>پیش
            غذا</span></div>
        <div @click="changeMenu('غذای اصلی')" class="m6_cat" id="menu_2"><img src="../assets/asli.png"><span>غذای
            اصلی</span></div>
        <div @click="changeMenu('کباب')" class="m6_cat" id="menu_3"><img src="../assets/kabab-icon.png"><span>کباب
            ها</span></div>
        <div @click="changeMenu('نوشیدنی و مخلفات')" class="m6_cat" id="menu_4"><img
            src="../assets/drink.png"><span>نوشیدنی و مخلفات</span></div>
      </div>
      <div v-if="isAddmin" class="m6_cat absolute" @click="logout" style="bottom: 0">
        <v-icon color='white' size='50' class="">mdi-logout-variant</v-icon>
        <span>خروج</span>
      </div>
    </div>
  </div>
</template>

<script>
import '../components/menu.css';

export default {
  name: "MenuSite",
  data: () => ({
    subject: 'پیش غذا',
    isAddmin: localStorage.getItem('isAddmin')
  }),
  methods: {
    changeMenu(type) {
      this.$emit('changeSubject', type)
      this.subject = type
    },
    logout() {
      localStorage.removeItem('login')
      localStorage.removeItem('isAddmin')
      this.$router.push('/')
    }
  },
  created(){

  }
};
</script>

<style>
body {
  font-family: at10;
  direction: rtl;
  background-color: #ff0101;
}

#m6_menu {
  background-color: #ff0101;
}

.m6_cat {
  color: #ffffff;
  cursor: pointer;
}

#m6_menu>div>span {
  display: block;
}

a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  color: #222;
  text-decoration: none;
}

a:active,
a:focus,
a:hover {
  color: #DB0B00;
  outline-width: 0;
  text-decoration: none;
  cursor: pointer;
}

a:focus {
  outline: thin dotted;
}

a:hover,
a:active {
  color: #000;
  outline: 0;
}
</style>
