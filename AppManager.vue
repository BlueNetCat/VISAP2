<template>
  <div id="app-manager">

    <ol-map ref="map"></ol-map>
    <animation-canvas ref="animcanvas"></animation-canvas>

  </div>
</template>






<script>
// Import components
import Map from "Map.vue";
import AnimationCanvas from "AnimationCanvas.vue";


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
  },
  components: {
    "ol-map": Map,
    "animation-canvas": AnimationCanvas,
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