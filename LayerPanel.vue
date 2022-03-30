<template>
  <div id="layer-panel" class="p-4 container-fluid">
    <!-- Row - Title -->
    <div class="row p-3">
      <h4>Layers</h4>
    </div>
    
    <!-- Row - Base layers-->
    <div class="row p-3">
      <!-- Column - Title -->
      <div class="col centered">
        Base layer
      </div>
      <div class="col centered">
      <!-- Button group - Base layers-->
        <div class="btn-group" role="group">
          <button type="button" class="btn" :class="[selBaseLayer == bLayer ? 'btn-active' : '']" @click='baseLayerClicked' :key="bLayer" v-for="bLayer in baseLayers">{{bLayer}}</button>
        </div>
      </div>
    </div>

    <!-- Row -->
    <div class="row p-3">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn m-2" :class="[layerOpacity > 0 ? '' : 'btn-active']" @click='layerVisClicked'>Fishing Tracks</button>
        <input class='slider m-2' type="range" min="0" max="1" step="0.01" v-model="layerOpacity" id="layerOpacity">
        <!-- <div class=''>{{layerOpacity}}</div> -->
      </div>
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
      baseLayers: ['Bathymetry', 'OSM', 'Imagery', 'Ocean'], // TODO: get layers from map when created
      selBaseLayer: 'Bathymetry',
    }
  },
  watch: {
    layerOpacity(vv){
      // Callback to change layer opacity
      this.$emit('layerOpacityChange', ['fishingTracks', vv]);
    }
  },
  methods: {
    // USER HTML ACTIONS
    baseLayerClicked: function(e){
      this.selBaseLayer = e.target.innerText;
      this.$emit('baseLayerChange', this.selBaseLayer);
    },
    // Fishing tracks layer opacity
    layerVisClicked: function(e){
      // 
      
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

.btn {
  background: rgba(198, 239, 255, 0.8);
  border: 2px solid #02488e33;
  font-size: 12px
}

.btn-active {
  background: rgb(125 200 232);
}

.centered {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>