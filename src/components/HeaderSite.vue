<template>
  <v-row class="mb-2 headerSite">
    <v-col cols="3">
      <v-img style="float:left" class="shrink mr-2 mt-2 ml-6" contain src="../assets/headerImg.png"
        transition="scale-transition" width="70%" />
    </v-col>
    <v-col cols="9">
      <v-row class="yellow darken-2 relative pr-12 py-2">
        <div class="triangle absolute" />
        <div>
          <span class="headerText">021-77525279</span>
          <v-icon small class="mr-2">
            mdi-phone-in-talk
          </v-icon>
        </div>
        <div>
          <span class="headerText mr-4">خیابان شهید مطهری-خیابان لارستان</span>
          <v-icon small class="mr-2">
            mdi-map-marker
          </v-icon>
        </div>
      </v-row>
      <v-row class="mt-lg-12 mt-md-2" justify="center">
        <span class="itemText cursorPointer" v-for="(item, i) in items" :key="i">{{ item }}</span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HeaderSite",
  data: () => ({
    items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8']
  }),
};
</script>
