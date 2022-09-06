<template>
    <v-row>
        <v-carousel height='100%' cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
    </v-row>
</template>

<script>
import image1 from '../assets/slider-1.jpg'
import image2 from '../assets/slider-2.jpg'
import image3 from '../assets/slider-3.jpg'
export default {
    name: "ImagesComponent",
    data: () => ({
        items: [
            {
                src: image1,
            },
            {
                src: image2,
            },
            {
                src: image3,
            },
        ],
    }),
};
</script>