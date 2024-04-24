<template>
    <div class="notifyAlert rounded ma-3">
      <v-alert class="mb-0" :type="success ? 'success' : 'error'" color="#1cb4b2">
        <span class="ltr mr-3">{{text}}</span>
        
    </v-alert>
    </div>
</template>

<script>
export default {
  name: "AlertText",
  props:{
    text:{
      type:String,
      require:true
    },
    success:{
      Type:Boolean,
      require:false
    }
  },
  data: () => ({
  }),
  watch:{

  },
  methods:{
    
  }
};
</script>
