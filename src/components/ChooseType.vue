<template>
  <div>
    <div id="cover" style="background-image:url('../assets/bk.png')"></div>
    <div id="m6_main_menu" style="display: block;">
      <div id="t6_logo"><img src="../assets/logo.png" /></div>
      <div class="line"></div>
      <div id="t6_logo"><img src="../assets/hotel.png" /></div>
      <a style="display: flex;margin-top:0px;" class="m6_main_cat" href="resturant.html"><img
          src="../assets/ico_341_1630857942.png" /> <span>رستوران</span></a>
      <a style="display: flex;" class="m6_main_cat" href="coffee.html"><img src="../assets/ico_341_1630857933.png" />
        <span>کافه</span></a>
    </div>
  </div>
</template>

<script>
  import '../components/menu.css'
export default {
  name: "ChooseType",
  data: () => ({

  }),
};
</script>

<style>
body {
  background-color: #9e0b0f;
  font-family: at10;
}

#m6_menu {
  background-color: #9e0b0f;
}

.m6_main_cat {
  background-color: #9e0b0f;
}

.m6_cat_checked {
  background-color: #9e0b0f;
}

.m6_main_cat {
  color: #ffffff;
}

.m6_cat {
  color: #ffffff;
}

#rest_info>* i {
  background-color: #9e0b0f;
}

.m6_food>div:nth-child(2) span {
  background-color: #9e0b0f;
  color: #ffffff;
}

#note_button {
  background-color: #9e0b0f;
  color: #ffffff;
}

#reserve_button>* {
  background-color: #9e0b0f;
  color: #ffffff;
}

#option_add_note {
  background-color: #9e0b0f;
  color: #ffffff;
}

.m6_main_cat img {
  height: 125px;
  margin-left: 0px;
}

.m6_main_cat>span {
  display: none;
}

.m6_main_cat {
  text-align: center;
}

.m6_main_cat {
  background: none;
}

#t6_logo img {
  width: 50%;
  padding: 18px 0px 15px 0px;
}

#m6_menu {
  background-color: #ff0101;
}

.m6_cat_checked {
  background-color: #9e0b0f;
}

.m6_food>div:nth-child(1)>div:nth-child(2)>div:nth-child(1) {
  text-align: right;
  font-family: at10;
}

.m6_food {
  border-bottom: groove;
  border-bottom-color: #000000;
}

.food_label {
  background-color: #FF0101;
  color: #ffffff;
}

#m6_menu>div>span {
  display: block;
}

.m6_cat_checked {
  background-color: #9e0b0f;
}

#m6_main_menu>div {
  padding: 0px 0px;
}

.m6_food>div:nth-child(1) {
  background-color: #ffffff;
  color: #000000;
}

.mag_contacts_row img {
  height: 107px;
  margin-left: 0px;
}

.m6_food>div:nth-child(1) {
  border-radius: 40px;
}
</style>
