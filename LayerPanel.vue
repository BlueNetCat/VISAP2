<template>
  <div id="layer-panel" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Layers</h4>
    </div>
    


  </div>
</template>




<script>
export default {
  name: "layer-panel",
  created(){

  },
  mounted(){

  },
  unmounted(){

  },
  data(){
    return {
      layerOpacity: 1,

      
    }
  },
  watch: {
    layerOpacity(vv){
      // TODO: callback to change layer opacity
    }
  },
  methods: {
    // USER HTML ACTIONS
    foo: function(e){
    },
    

    // PRIVATE METHODS
    foo: function(){
      
    },


    // PUBLIC METHODS
    foo: function(){
    },

    

  },
  components: {

  },
  computed: {

  }
}
</script>

<style scoped>
#layer-panel {
   font-size: 12px
}
</style>