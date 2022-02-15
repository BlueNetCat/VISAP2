<template>
  <div id="app-manager">
    <!-- Container -->
    <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
      <!-- Map -->
      <div style="width: -webkit-fill-available; height: -webkit-fill-available;">
        <ol-map ref="map"></ol-map>
        <animation-canvas ref="animcanvas"></animation-canvas>
      </div>
      <!-- Side panel -->
      <div>
        <app-side-panel @selectedTrack='selectedTrack'></app-side-panel>
      </div>

    </div>


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
#animationCanvas {
  background: none;
}

</style>