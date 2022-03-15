<template>
<!-- Container -->
  <div id="app-manager">

    <!-- Map  container-->
    <ol-map id="ol-map" @onTrackClicked="openSidePanel" @onFishingTracksLoad="fishingTracksLoad" ref="map"></ol-map>
    <!-- <animation-canvas ref="animcanvas"></animation-canvas> SHOULD BE ON MAP-->
    
    <!-- Side panel -->
    <app-side-panel ref="sidePanel" @selectedTrack='selectedTrack' @onTabClicked='sidePanelTabClicked' @onPanelTransitionEnd='sidePanelTabClicked'></app-side-panel>

    <!-- <weather-widget></weather-widget> -->
  </div>
</template>






<script>
/*
APP STRUCTURE

                APP MANAGER
              /            \
        OL-MAP              APP-SIDE-PANEL
        /                      \          
    TIME-RANGE-BAR           HAUL-INFO    
      /                          \
  RANGE-SLIDER               WEATHER-WIDGET

*/


// Import components
import Map from "Map.vue";
import AnimationCanvas from "AnimationCanvas.vue";
import AppSidePanel from "AppSidePanel.vue"

import WeatherWidget from "WeatherWidget.vue"

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
    },
    // When the user clicks on a tab (AppSidePanel.vue), update the month names in TimeRangeBar
    sidePanelTabClicked: function(){
      // Send event to map
      this.$refs.map.onTabClicked();
    }
  },
  components: {
    "ol-map": Map,
    "animation-canvas": AnimationCanvas,
    "app-side-panel": AppSidePanel,

    "weather-widget": WeatherWidget
    
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