<template>
<!-- Container -->
  <div id="app-manager">

    <!-- Map  container-->
    <ol-map id="ol-map" @onTrackClicked="openSidePanel" @onFishingTracksLoad="fishingTracksLoad" ref="map"></ol-map>
    <!-- <animation-canvas ref="animcanvas"></animation-canvas> SHOULD BE ON MAP-->
    
    <!-- Side panel -->
    <!-- <div style="height: 100%; width: auto"> -->
    <app-side-panel ref="sidePanel" @selectedTrack='selectedTrack'></app-side-panel>

  </div>
</template>






<script>
// Import components
import Map from "Map.vue";
import AnimationCanvas from "AnimationCanvas.vue";
import AppSidePanel from "AppSidePanel.vue"


export default {
  name: "app-manager",
  created(){

  },
  mounted () {

  },
  data () {
    return {
      
    }
  },
  methods: {
    // INTERNAL EVENTS
    // Event coming from side panel HaulInfo.vue
    selectedTrack: function(id){
      // Send this message to map
      this.$refs.map.setSelectedTrack(id);
    },
    // When a track is clicked on the map (Map.vue / TracksTimeLine.vue)
    openSidePanel: function(id){
      // Send the id to side panel
      this.$refs.sidePanel.openFishingTab(id);
    },
    // Fishing tracks have been loaded
    fishingTracksLoad: function(geojson){
      // Send data to HaulInfo.vue
      this.$refs.sidePanel.setFishingTracks(geojson);
    }
  },
  components: {
    "ol-map": Map,
    "animation-canvas": AnimationCanvas,
    "app-side-panel": AppSidePanel
  },
  computed: {
  
  }
}


</script>





<style scoped>

#app-manager {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}


#ol-map {
  /* background: red; */
  width: 100%; 
  height: 100%;
}

#animationCanvas {
  background: none;
}

</style>