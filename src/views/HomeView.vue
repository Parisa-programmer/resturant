<template>
  <div class="home mt-sm-11">
   <choose-type />
  </div>
</template>



<style scoped>
@media (max-width: 600px) {
  .main-page-sectionImage {
    width: 90%;
  }
}
</style>

<script>
// import QuestionAnswer from '@/components/QuestionAnswer.vue'

const $ = require("jquery");
import axios from "axios";

import ChooseType from '@/components/ChooseType.vue';
axios.defaults.headers.common["Client-Token"] = "Ahuan-Wapi?123";

export default {
  name: "HomeView",
  metaInfo: {
    title: "خدمات گردشگری آهوان",
    meta: [{ name: "description", content: "" }],
  },
  components: {
    ChooseType,
  },
  watch: {
    showAlert() {
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    },
  },
  data: () => ({
    groups: [],
    selectedSection: {
      icon: "mdi-airplane",
      title: "بلیط",
      active: true,
    },
    magazineItems: [
      {
        image: require("../assets/image/magazine-turkiye.jpg"),
        title: "جاذبه‌های استانبول",
        text: "تور استانبول، به دلیل خدمات تفریحی‌ای که برای افراد به همراه داره، می‌تونه به شما در روند تجربه یک سفر متفاوت کمک کنه. تور استانبول از تمام شهرهای ایران، در میان تورهای پرطرفداری قرار می‌گیره که هزینه نسبتا مناسبی برای افراد...",
        link: "/tour/1",
      },
      {
        image: require("../assets/image/magazine-urope.jpg"),
        title: "جاذبه‌های اروپا",
        text: "سفر با تور اروپا بدون شک یکی از زیباترین و بهترین تجربیات زندگی هر فرد می‌باشد. این قاره یکی از مقاصد زیبا برای سفر است که در سالهای اخیر به یکی از محبوب‌ترین مقاصد توریستی جهان تبدیل‌شده‌است. در بین تمامی مردم جهان...",
        link: "/tour/1017",
      },
      {
        image: require("../assets/image/magazine-maldives.jpg"),
        title: "جاذبه‌های مالدیو",
        text: "تور مالدیو برای آنهایی که عاشق سکوت و طبیعت آرام اقیانوس هستند، تفاوتی با رویا ندارد. زیرا با سفر به مالدیو و اقامت در جزایر بی‌نظیرش، هر روز با منظره اقیانوس می‌خوابید و بیدار می‌شوید و محو زیبایی طبیعت رویایی مالدیو...",
        link: "/tour/1027",
      },
      {
        image: require("../assets/image/magazine-thailand.jpg"),
        title: "تور تایلند",
        text: "کشور تایلند نه تنها برای توریست های ایرانی بلکه برای توریست های سراسر جهان جذابیت دارد بلکه با خرید تور تایلند از پارک های طبیعی و زیبای این کشور از جمله: پارک ملی کائو یای، پارک پانک سیدا و پارک ملی تا پرایا و موارد دیگر...",
        link: "/tour/1044",
      },
      {
        image: require("../assets/image/magazine-dubai.jpg"),
        title: "جاذبه های دبی",
        text: "دبی یکی از شهرهای بزرگ و پرطرفدار امارات متحده عربی است که درواقع یک شهر لاکچری و مدرن در بین تمام شهرهای دنیا می‌باشد.بدلیل کوتاه بودن مسافت بلیط و همسایگی با این کشور نه تنها منطقه خاورمیانه، بلکه در سراسر جهان...",
        link: "/tour/1026",
      },
    ],
    windowWidth: 0,
    slickOptions: {},
    slickOptions2: {},
  }),
  methods: {
    changeSection(event) {
      console.log(event);
      this.selectedSection = event;
    },
    getWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.getWidth();
    this.slickOptions = {
      slidesToShow:
        this.windowWidth > 1400
          ? 3
          : this.windowWidth <= 1400 && this.windowWidth > 960
          ? 3
          : this.windowWidth <= 960 && this.windowWidth > 599
          ? 2
          : 1,
      slidesToScroll: 1,
      rtl: true,
      autoplay: true,
      autoplaySpeed: 2500,
    };
    this.slickOptions2 = {
      slidesToShow:
        this.windowWidth > 1400
          ? 4
          : this.windowWidth <= 1400 && this.windowWidth > 960
          ? 3
          : this.windowWidth <= 960 && this.windowWidth > 599
          ? 2
          : 2,
      slidesToScroll: 1,
      rtl: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2500,
      accessibility: true,
    };
  },
};
</script>
