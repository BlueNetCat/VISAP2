<template>
  <div id="app-side" style="display:flex; height: 100%">

    <!-- Tabs -->
    <div class="position-relative" ref="buttonGroup" style="margin-top:50px; height: fit-content; display:flex; flex-direction:column">
      <div  class="btn tab vertical-button" :class="{active: tab.isSelected}" type="button" :title="tab.name" :id="tab.id" @click="onTabClicked" :key="tab.name" v-for="tab in tabs">
       {{tab.name}}
      </div>
    </div>


    <!-- Panel -->
    <div class="collapse width" :class="{show: isPanelOpen}" style="overflow: auto; transition: width 0.5s">

      <!-- Info container -->
      <div class="side-panel-content g-0" style="">
        <haul-info @selectedTrack="selectedTrack" ref="haul-info" v-if="selTab == 'tracks'"></haul-info>
        <div v-else-if="selTab === 'effort'">
          <h4>Fishing Effort</h4>
        </div>
        <div v-else-if="selTab === 'weather'">
          <h4>Weather and sea conditions</h4>
        </div>
      </div>

    </div>



    

  </div>
</template>





<script>
// Import components
import HaulInfo from "HaulInfo.vue"
//import Map from "Map.vue";
//import AnimationCanvas from "AnimationCanvas.vue";


export default {
  name: "app-side",
  created(){

  },
  mounted () {
    // Move tab buttons to be inside the window
    this.$refs.buttonGroup.style['margin-left'] = -this.$refs.buttonGroup.offsetHeight + 'px';
    this.$refs.buttonGroup.style['margin-left'] = -this.$refs.buttonGroup.offsetWidth + 'px';

    // HACK Fix Force openlayers canvas -> In the previous coude I am modifing the position of the tab buttons and the canvas does not
    // cover the whole window. Openlayers reacts to window resize events, therefore we can trigger the window event so that the
    // canvas fills the whole window.
    window.dispatchEvent(new Event('resize'));
  },
  data () {
    return {
      tabs: {
        "tracks": {
          id: "tracks",
          name: "Fishing tracks",
          isSelected: false
        },
        "effort": {
          id: "effort",
          name: "Fishing effort",
          isSelected: false
        },
        "weather": {
          id: "weather",
          name: "Weather and sea",
          isSelected: false
        }
      },
      isPanelOpen: false,
      selTab: "",
    }
  },
  methods: {
    // USER HTML ACTIONS
    onTabClicked: function(event){
      // Use id to get tab
      let id = event.target.id;
      let tab = this.tabs[id];
      // If tab is selected and panel is open, close panel
      if (tab.isSelected){
        this.closePanel();
        tab.isSelected = false;
        this.selTab = "";
      }
      // If tab is not selected, open panel
      else {
        // Unselect all first
        Object.keys(this.tabs).forEach(kk => this.tabs[kk].isSelected = false);
        // Select tab and open panel
        tab.isSelected = true;
        this.selTab = id;
        this.openPanel();
      }
    },

    // INTERNAL EVENTS
    openPanel: function(){
      this.isPanelOpen = true;
    },
    closePanel: function(){
      this.isPanelOpen = false;
    },
    selectedTrack: function(id){
      this.$emit('selectedTrack', id);
    },

    // PUBLIC METHODS
    // Set fishing tracks once loaded
    // OPTIONS-TODO:
    // OPTION 1- Map is loading the tracks. When they are loaded there, an event can be passed to haul info, but the chain is
    // quite long: Map.vue - AppManager.vue - AppSidePanel.vue - HaulInfo.vue
    // OPTION 2- We consider FishingTracks class as singleton and we call it directly from HaulInfo.vue. We can make this call
    // iteratively until fishing tracks exist. Not so clean, as the tab Fishing Tracks should only exist once the fishing tracks
    // have been loaded. If there is an error with loading the fishing tracks, the tab should not exist?
    setFishingTracks: function(tracks){
      if (this.$refs['haul-info'])
        this.$refs['haul-info'].setTracks(tracks);
    },
    // Opens fishing tracks panels. If open, keeps it open
    openFishingTracks: function(fishingTrack){
      // Unselect all first
        Object.keys(this.tabs).forEach(kk => this.tabs[kk].isSelected = false);
      // Select tab
      this.tabs.tracks.isSelected = true;
      // Open panel
      this.openPanel();
    },

  },
  components: {
    "haul-info": HaulInfo,
    //"ol-map": Map,
    //"animation-canvas": AnimationCanvas,
  },
  computed: {
  
  }
}


</script>





<style scoped>
.vertical-button {
  -webkit-transform: scale(-1);
  -moz-transform: scale(-1);
  -ms-transform: scale(-1);
  -o-transform: scale(-1);
  transform: scale(-1); 
  writing-mode: vertical-rl;
  text-orientation: sideways;
  padding: 8px 4px 8px 4px ;
  font-size: 12px;
  margin-top: 2px;
  

  border-radius: 0px 12px 12px 0px;
}


.collapse.show {
  width: 40vw;  
}
.collapse:not(.show){
  width: 0;
  height: initial;
  display: block;
}

.tab {
  color: rgb(0, 0, 0);
  background-color: #a0d7f2;
  border-color: #72b0cf;
}
.tab.active {
  color: rgb(0, 0, 0);
  background-color: #7dc8e8;
  border-color: #569ab8;
  box-shadow: 1px 0px 2px #0a3142;
}


.side-panel-content {
  display:flex; 
  flex-direction: column;
  align-items: center;
  background: #e3f4ff;; 
  height: 100%;
}
</style>