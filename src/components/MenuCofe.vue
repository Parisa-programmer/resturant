<template>
  <div>
    <v-img id="cover" src="../assets/cofe.jpg"></v-img>

    <div id="m6_menu" style="left:0;">
      <div class="menu-bar" :style="{maxHeight: isAddmin ? '80%' : '100%'}">
        <div class="m6_cat" id="menu_1" @click="changeMenu('پیش غذا')"><img src="../assets/soap.png"><span>پیش
            غذا</span></div>
        <div class="m6_cat" id="menu_2" @click="changeMenu('سالاد')"><img src="../assets/salad.png"><span>سالاد</span>
        </div>
        <div class="m6_cat" id="menu_3" @click="changeMenu('ساندویچ')"><img
            src="../assets/sandwich.png"><span>ساندویچ</span></div>
        <div class="m6_cat" id="menu_4" @click="changeMenu('پاستا')"><img src="../assets/pasta.png"><span>پاستا</span>
        </div>
        <div class="m6_cat" id="menu_5" @click="changeMenu('سوخاری')"><img
            src="../assets/chicken-drumstick.png"><span>سوخاری</span></div>
        <div class="m6_cat" id="menu_6" @click="changeMenu('پیتزا')"><img src="../assets/pizza.png"><span>پیتزا</span>
        </div>
        <div class="m6_cat" id="menu_7" @click="changeMenu('نوشیدنی گرم')"><img
            src="../assets/drink-hot.png"><span>نوشیدنی های گرم</span></div>
        <div class="m6_cat" id="menu_8" @click="changeMenu(' نوشیدنی سرد')"><img
            src="../assets/drink-cold.png"><span>نوشیدنی های سرد</span></div>
        <div class="m6_cat" id="menu_9" @click="changeMenu('بستنی ها')"><img src="../assets/icecream.png"><span>بستنی
            ها</span></div>
        <div class="m6_cat" id="menu_10" @click="changeMenu('اسموتی فصل')"><img
            src="../assets/smoothie-of-the-season.png"><span>اسموتی فصل</span></div>
        <div class="m6_cat" id="menu_11" @click="changeMenu('فراپه')"><img src="../assets/frappe.png"><span>فراپه</span>
        </div>
      </div>



      <!-- <div @click="changeMenu('پیش غذا')" class="m6_cat" id="menu_1"><img src="../assets/soap.png"><span>پیش غذا</span></div>
      <div @click="changeMenu('غذای اصلی')" class="m6_cat" id="menu_2"><img src="../assets/asli.png"><span>غذای اصلی</span></div>
      <div @click="changeMenu('کباب')" class="m6_cat" id="menu_3"><img src="../assets/kabab-icon.png"><span>کباب ها</span></div>
      <div @click="changeMenu('نوشیدنی و مخلفات')" class="m6_cat" id="menu_4"><img src="../assets/drink.png"><span>نوشیدنی و مخلفات</span></div> -->
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
