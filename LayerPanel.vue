<template>
  <div id="layer-panel" class="p-4 container-fluid">
    <!-- Row - Title -->
    <div class="row p-3">
      <h4>Layers</h4>
    </div>
    
    <!-- Row - Base layers-->
    <div class="row p-3" style='justify-content: center;'>
      <!-- Column - Title -->
      <div class="col-md-auto centered">
        Base layer
      </div>
      <div class="col-md-auto centered">
      <!-- Button group - Base layers-->
        <div class="btn-group" role="group">
          <button type="button" class="btn" :class="[selBaseLayer == bLayer ? 'btn-active' : '']" @click='baseLayerClicked' :key="bLayer" v-for="bLayer in baseLayers">{{bLayer}}</button>
        </div>
      </div>
    </div>

    <!-- Row - Fishing Tracks-->
    <div class="row p-1">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn m-2" :class="[fTracksOpacity > 0 ? '' : 'btn-active']" @click='fTracksClicked'>Fishing Tracks</button>
        <input class='slider m-2' type="range" min="0" max="1" step="0.01" v-model="fTracksOpacity" id="fTracksOpacity">
      </div>
    </div>

    <!-- Row - Fishing Effort -->
    <div class="row p-1">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn m-2" :class="[fEffortOpacity > 0 ? '' : 'btn-active']" @click='fEffortClicked'>Fishing Effort</button>
        <input class='slider m-2' type="range" min="0" max="1" step="0.01" v-model="fEffortOpacity" id="fEffortOpacity">
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
      fTracksOpacity: 1,
      fEffortOpacity: 1,
      baseLayers: ['Bathymetry', 'OSM', 'Imagery', 'Ocean'], // TODO: get layers from map when created
      selBaseLayer: 'Bathymetry',
    }
  },
  watch: {
    fTracksOpacity(vv){
      // Callback to change layer opacity
      this.$emit('layerOpacityChange', ['fishingTracks', vv]);
    },
    fEffortOpacity(vv){
      this.$emit('layerOpacityChange', ['fishingEffort', vv]);
    }
  },
  methods: {
    // USER HTML ACTIONS
    baseLayerClicked: function(e){
      this.selBaseLayer = e.target.innerText;
      this.$emit('baseLayerChange', this.selBaseLayer);
    },
    // Fishing tracks layer opacity
    fTracksClicked: function(e){
      this.fTracksOpacity = this.fTracksOpacity == 0 ? 1 : 0;
    },
    fEffortClicked: function(e){
      this.fEffortOpacity = this.fEffortOpacity == 0 ? 0.8 : 0;
    },
    

    // PRIVATE METHODS
    // foo: function(){
    // },


    // PUBLIC METHODS
    // Connected to Fishing Effort panel
    setFEffortOpacity: function(opacity){
      this.fEffortOpacity = opacity;
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