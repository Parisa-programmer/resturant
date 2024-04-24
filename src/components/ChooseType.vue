<template>
  <div>
    <!-- <div id="cover" style="background-image: url('../assets/bk.png')"></div> -->
    <v-img
      class="fixed heightAll widthAll"
      src="../assets/bk.png"
      alt=""
      style="height: 110vh; top: -20px;position:fixed"
    />
    <div id="m6_main_menu" style="display: block">
      <div id="t6_logo"><img src="../assets/logo.png" /></div>
      <div class="line" style="margin-top: 0;margin-bottom: 0;"></div>
      <router-link
        to="/resturant"
        style="display: flex; margin-top: 100px"
        class="m6_main_cat"
      >
        <img src="../assets/ico_341_1630857942.png" /> 
        <span>رستوران</span>
      </router-link>
      <router-link
        to="/coffeshop"
        style="display: flex; margin-top: 100px"
        class="m6_main_cat"
      >
        <img width="500" src="../assets/ico_341_1630857933.png" />
        <span>کافه</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import "../components/menu.css";
export default {
  name: "ChooseType",
  data: () => ({}),
};
</script>

<style>
body {
  background-color: #14179e;
  font-family: pelak;
}

#m6_menu {
  background-color: #14179e;
}

.m6_main_cat {
  background-color: #14179e;
}

.m6_cat_checked {
  background-color: #14179e;
}

.m6_main_cat {
  color: #ffffff;
}

.m6_cat {
  color: #ffffff;
}

#rest_info > * i {
  background-color: #14179e;
}

.m6_food > div:nth-child(2) span {
  background-color: #14179e;
  color: #ffffff;
}

#note_button {
  background-color: #14179e;
  color: #ffffff;
}

#reserve_button > * {
  background-color: #14179e;
  color: #ffffff;
}

#option_add_note {
  background-color: #14179e;
  color: #ffffff;
}

.m6_main_cat img {
  height: 125px !important;
  margin-left: 0px !important;
}

.m6_main_cat > span {
  display: none;
}

.m6_main_cat {
  text-align: center;
}

.m6_main_cat {
  background: none;
}

#t6_logo img {
  width: 50% !important;
  padding: 18px 0px 15px 0px;
}

#m6_menu {
  background-color: #14179e;
}

.m6_cat_checked {
  background-color: #14179e;
}

.m6_food > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
  text-align: right;
  font-family: pelak;
}

.m6_food {
  border-bottom: groove;
  border-bottom-color: #000000;
}

.food_label {
  background-color: #14179e;
  color: #ffffff;
}

#m6_menu > div > span {
  display: block;
}

.m6_cat_checked {
  background-color: #14179e;
}

#m6_main_menu > div {
  padding: 0px 0px;
}

.m6_food > div:nth-child(1) {
  background-color: #ffffff;
  color: #000000;
}

.mag_contacts_row img {
  height: 107px;
  margin-left: 0px;
}

.m6_food > div:nth-child(1) {
  border-radius: 40px;
}
</style>
