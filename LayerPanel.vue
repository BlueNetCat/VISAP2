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


    <!-- Row - Weather layers-->
    <div class="row p-3" style='justify-content: center; flex-wrap: nowrap'>
      <!-- Column - Title -->
      <div class="col-md-auto centered" style='flex-direction:column'>
        <div class='row'> Climatological layer </div>
        <div class='row'> Date: {{currentDate}} </div>
        <div class='row'> {{timeScale}} </div>
        <input class='row slider m-2' type="range" min="0" max="1" step="0.01" v-model="climaOpacity" id="fEffortOpacity">
      </div>
      <div class="col-md-auto centered">
      <!-- Button group - Base layers-->
        <div class="btn-group" role="group" style='flex-direction: column;'>
          <button type="button" class="btn" :class="[selClimaLayer == cLayer ? 'btn-active' : '']" @click='climaLayerClicked' :key="cLayer" v-for="cLayer in climaLayers">{{cLayer}}</button>
        </div>
      </div>
    </div>

  </div>
</template>




<script>
export default {
  name: "layer-panel",
  created(){
    // TODO: WMSDataRetriever could return a openlayers source or similar
    // LayerPanel > WMSDataRetriever: give me parameters for that data type and date
    // LayerPanel > Map: send parameters. Map can create layer from a dataset (and also animation layer)

    // Create data retreiver
    this.dataRetriever = new WMSDataRetriever(); // TODO: change data retriever constructor to getInstance static method

  },
  mounted(){

  },
  unmounted(){

  },
  data(){
    return {
      fTracksOpacity: 1,
      fEffortOpacity: 1,
      climaOpacity: 1,
      baseLayers: ['Bathymetry', 'OSM', 'Imagery', 'Ocean'], // TODO: get layers from map when created
      selBaseLayer: 'Bathymetry',
      climaLayers: ['None', 'Sea Surface Temperature', 'Sea Bottom Temperature', 'Chlorophyll', 'Salinity', 'Wind', 'Wave Significant Height', 'Current'],
      selClimaLayer: 'None',

      currentDate: '13 April 2019',
      timeScale: 'Daily mean',
      
    }
  },
  watch: {
    fTracksOpacity(vv){
      // Callback to change layer opacity
      this.$emit('layerOpacityChange', ['fishingTracks', vv]);
    },
    fEffortOpacity(vv){
      this.$emit('layerOpacityChange', ['fishingEffort', vv]);
    },
    climaOpacity(vv){
      this.$emit('layerOpacityChange', ['data', vv]);
    }
  },
  methods: {
    // USER HTML ACTIONS
    baseLayerClicked: function(e){
      this.selBaseLayer = e.target.innerText;
      this.$emit('baseLayerChange', this.selBaseLayer);
    },
    climaLayerClicked: function(e){
      this.selClimaLayer = e.target.innerText;
      // Get date
      let ff = FishingTracks.getFeatureById(FishingTracks.getSelectedTrack());
      this.currentDate = ff.properties.info.Data;
      let date = ff.properties.info.Data + 'T12:00:00.000Z';
      // Get clima URL
      let source = this.dataRetriever.getDataTypeURL(this.selClimaLayer, date, 'd');
      // If source is not found, it will send undefined
      this.$emit('climaLayerChange', source);
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
    // Set the date
    setDate: function(date){
      // Get available date from WMSDataRetriever
      // Send parameters to Map.vue
      // Update HTML info
      this.currentDate;
      this.timeScale;
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

.btn:hover {
  background: rgba(169, 231, 255, 0.8);
  box-shadow: 0 0 4px #02488e33;
}

.centered {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>