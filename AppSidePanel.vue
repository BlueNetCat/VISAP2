<template>
  <div id="app-side" style="display:flex; height: 100%">

    <!-- Menu buttons -->
    <div class="position-relative" ref="buttonGroup" style="margin-top:50px; height: fit-content; display:flex; flex-direction:column">
    <div  class="btn btn-dark vertical-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Tracks
    </div>
    <div  class="btn btn-dark vertical-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Fishing Effort
    </div>
    <div  class="vertical-button btn btn-dark " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Weather and Sea
    </div>
    </div>

    <!-- Container Tracks -->
    <div class="collapse width" id="collapseExample" style="transition: width 0.5s">

      <!-- Info container -->
      <div class="side-panel-content" style="">
        <!-- Row -->
        <div>
        </div>
      </div>

     


    </div>



    

  </div>
</template>





<script>
// Import components
//import Map from "Map.vue";
//import AnimationCanvas from "AnimationCanvas.vue";


export default {
  name: "app-side",
  created(){

  },
  mounted () {
    this.$refs.buttonGroup.style['margin-left'] = -this.$refs.buttonGroup.offsetHeight + 'px';
    console.log(this.$refs.buttonGroup.offsetHeight);
    console.log(this.$refs.buttonGroup.offsetWidth);
    console.log(this.$refs.buttonGroup.getBoundingClientRect());
    
    this.$refs.buttonGroup.style['margin-left'] = -this.$refs.buttonGroup.offsetWidth + 'px';
  },
  data () {
    return {
      
    }
  },
  methods: {
  },
  components: {
    //"ol-map": Map,
    //"animation-canvas": AnimationCanvas,
  },
  computed: {
  
  }
}


</script>





<style scoped>
.vertical-button {
  /* -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg); */
  writing-mode: vertical-rl;
  text-orientation: sideways;
  transform: scale(-1);
  padding: 8px 4px 8px 4px ;
  font-size: 12px;
  margin-top: 2px;
  

  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
}



.collapse.show {
  width: 40vw;  
}

.collapsing {
  width: 0;
  height: initial;
}


.side-panel-content {
  display:flex; 
  flex-direction: column; 
  background: red; 
  height: 100%;
}
</style>