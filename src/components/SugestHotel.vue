<template>
  <div>
    <h3 class="title cursorPointer mr-12 mt-6">هتل های پیشنهادی آهوان
      <div class="underTitle" />
    </h3>
    <v-sheet max-width="100%" class="ltr">
      <v-slide-group v-model="slideGroup" class="pa-4" show-arrows>
        <v-slide-item v-for="(item, i) in items" :key="i" v-slot="{ active, toggle }">
          <v-card :color="active ? 'white' : 'white'" class="ma-4" width="302" @click="toggle">
            <v-img height="280" :src="item.image"></v-img>
            <div class="ma-2 text-right">
              <v-row>
                <h4>{{ item.text }}</h4>
                <vs-spacer></vs-spacer>
                <v-rating size="22" :value="item.rate" background-color="orange lighten-3" color="orange"></v-rating>
              </v-row>
              <div class="grey--text text-subtitle-1 my-2">
                {{ item.during }}
                شب اقامت

              </div>
              <vs-row class="my-1 align-items-center" align-items="center">
                <v-btn color="float-right red white--text  text-subtitle-2" @click="reserve">
                  مشاهده و رزرو
                </v-btn>
                <vs-spacer></vs-spacer>
                <span class="float-left">{{ item.price }} ریال</span>
              </vs-row>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>
<script>
import image1 from '../assets/slider-1.jpg'
import image2 from '../assets/slider-2.jpg'
import image3 from '../assets/slider-3.jpg'

export default {
  name: "SugestHotel",
  data: () => ({
    items: [
      {
        rate: 3.5,
        image: image2,
        text: 'هتل اسپیناس پالاس',
        price: '8,000',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 4.5,
        image: image1,
        text: 'ارمنستان',
        price: '750,000',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 2,
        image: image1,
        text: 'هتل اسپیناس پالاس',
        price: '8,200',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 5,
        image: image3,
        text: 'هتل اسپیناس پالاس',
        price: '3,500',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 4.5,
        image: image2,
        text: 'هتل اسپیناس پالاس',
        price: '8,000',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 2,
        image: image1,
        text: 'هتل اسپیناس پالاس',
        price: '750,000',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 5,
        image: image1,
        text: 'هتل اسپیناس پالاس',
        price: '8,200',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
      {
        rate: 3.5,
        image: image3,
        text: 'هتل اسپیناس پالاس',
        price: '3,500',
        during: '1',
        services: 'پرواز،هتل و ترانسفر فرودگاهی',
      },
    ],
    slideGroup: 0,
  }),
  methods: {
    reserve() {

    },
    sliderSwaper() {
      this.slideGroup = this.slideGroup + 4
      if (this.slideGroup > this.items.length) {
        this.slideGroup = 0
      }
      console.log(this.slideGroup);
    },
  },
  created() {
    this.interval = setInterval(this.sliderSwaper, 4000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>