<template>
<!-- Container -->
  <div id="app-manager">

    <!-- Map  container-->
    <ol-map id="ol-map" ref="map"></ol-map>
    <!-- <animation-canvas ref="animcanvas"></animation-canvas> SHOULD BE ON MAP-->
    
    <!-- Side panel -->
    <!-- <div style="height: 100%; width: auto"> -->
    <app-side-panel @selectedTrack='selectedTrack'></app-side-panel>

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
    selectedTrack: function(id){
      // Send this message to map
      this.$refs.map.setSelectedTrack(id);
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