<template>
    <div class="notifyAlert rounded ma-3">
      <v-alert class="mb-0" :type="success ? 'success' : 'error'">
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
