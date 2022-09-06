<template>
    <div>
        <h3 class="mr-12 mt-6 title cursorPointer">تورهای پیشنهادی آهوان
            <div class="underTitle" />
        </h3>
        <v-sheet max-width="100%" class="ltr">
            <v-slide-group v-model="slideGroup" class="pa-4" show-arrows>
                <v-slide-item v-for="(item, i) in items" :key="i" v-slot="{ active, toggle }">
                    <v-card :color="active ? 'white' : 'white'" class="ma-4" width="302" @click="toggle">
                        <v-img height="280" :src="item.image"></v-img>
                        <h4 class="my-1 mx-2">{{ item.text }}</h4>
                        <div class="grey--text text-subtitle-2 mx-2">
                            {{ item.during }}
                        </div>
                        <div class="grey--text text-subtitle-2 mx-2">
                            خدمات:
                            {{ item.services }}
                        </div>
                        <vs-row class="my-3 align-items-center mx-2" align-items="center">
                            <v-btn color="float-right red white--text  text-subtitle-2" @click="reserve">
                                مشاهده و رزرو
                            </v-btn>
                            <vs-spacer></vs-spacer>
                            <span class="float-left ml-4">{{ item.price }} ریال</span>
                        </vs-row>
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
    name: "SugestTour",
    data: () => ({
        items: [
            {
                image: image2,
                text: 'استانبول',
                price: '8,000',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image1,
                text: 'ارمنستان',
                price: '750,000',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image1,
                text: 'گرجستان',
                price: '8,200',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image3,
                text: 'آنتالیا',
                price: '3,500',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image2,
                text: 'استانبول',
                price: '8,000',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image1,
                text: 'ارمنستان',
                price: '750,000',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image1,
                text: 'گرجستان',
                price: '8,200',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            },
            {
                image: image3,
                text: 'آنتالیا',
                price: '3,500',
                during: 'دو شب و سه روز',
                services: 'پرواز،هتل و ترانسفر فرودگاهی',
            }
        ],
        slideGroup: 0
    }),
    methods: {
        reserve() {
            console.log('reserved');
        },
    },
};
</script>
