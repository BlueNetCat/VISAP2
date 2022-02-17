<template>
  <div id="haul-info" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Fishing tracks</h4>
    </div>
    <!-- Row -->
    <div class="row p-3 g-0">
      <!-- TODO: This should be a modal with a table where you could sort by date and port. -->
      <select v-model="selTrack" @change="onSelectTrack">
        <option :id="option.Id" :key="option.Id" :value="option" v-for="option in options" >
          {{ option.name }}
        </option>
      </select>
    </div>
    <!-- Row -->
    <!-- <div class="row p-2 g-0">
      Selected track: {{selTrack.name}}
    </div> -->
    <!-- Row -->
    <div class="row p-2 g-0">
      <ul>
        <li style="list-style-position: inside;" :key="kk.Id" v-for="kk in Object.keys(selTrack)">
          {{kk}}: {{selTrack[kk]}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // REQUIRES FishingTracks.js
  name: "haul-info",
  created(){
    this.selTrack = this.options[0];
  },
  mounted(){
    //this.getFishingTracks();
    this.getSelectedFishingTrack();
  },
  unmounted(){
    // Deselect fishing track
    FishingTracks.setSelectedTrack(undefined);
    // Emit undefined id
    this.$emit('selectedTrack', undefined);
  },
  data(){
    return {
      selTrack: '',
      options: [
        { AvgDepth: "402.6",
        Data: "2020-11-12",
        Date: new Date("Thu Nov 12 2020 00:00:00 GMT-0800 (Pacific Standard Time)"),
        Distance: "15449.04",
        Duration: "128.17",
        Estacio: "Tardor",
        FishingGroundName: "clot de valldepins",
        FishingGroundType: "TALÚS INFERIOR",
        Id: 15699,
        MeshType: "Square",
        Port: "L'Ametlla de Mar",
        ZonaPort: "Sud",
        name: "L'Ametlla de Mar - 2020-11-12"},
      ]
    }
  },
  methods: {
    // USER HTML ACTIONS
    // When a track is selected
    onSelectTrack: function(event){
      let selectValue = event.target.value;
      let id = event.target.selectedOptions[0].id;

      // Set on FishingTracks 
      FishingTracks.setSelectedTrack(id);
      // Emit selected target
      this.$emit('selectedTrack', id);
    },

    // PRIVATE METHODS
    // Get Fishing Tracks from FishingTracks.js
    // getFishingTracks: function(){
    //   // Get geojson from FishingTracks
    //   let gjsonData= FishingTracks.getGeoJSON();
    //   // If data is not loaded yet --> DIRTY HACK. THIS SHOULD BE A SET FROM CALLBACK INSIDE FISHING TRACKS?
    //   if (gjsonData.features.length === 0){
    //     // Set timeout and try again
    //     setTimeout(this.getFishingTracks, 1000);
    //   } else {
    //     console.log("Fishing tracks loaded.");
    //   }
    //   // Process features to fit into select HTML
    //   let features = gjsonData.features;
    //   features.forEach((ff, index) => {
    //     let info = ff.properties.info;
    //     info.name = info.Port + " - " + info.Data;
    //     this.options[index] = info;
    //   });
    //   // Order by date
    //   this.options.sort((a, b) => {
    //       return a.Date - b.Date;
    //   });
    // },

    // Set Fishing tracks once they are loaded
    setFishingTracks: function(gjsonData){
      // Process features to fit into select HTML
      let features = gjsonData.features;
      features.forEach((ff, index) => {
        let info = ff.properties.info;
        info.name = info.Port + " - " + info.Data;
        this.options[index] = info;
      });
      // Order by date
      this.options.sort((a, b) => {
          return a.Date - b.Date;
      });
    },

    getSelectedFishingTrack: function(){
      let selId = FishingTracks.getSelectedTrack(); // This is a general application state. Maybe it should not be stored there
      this.options.forEach(oo =>{
        if (selId == oo.Id)
          this.selTrack = oo;
      });
    },


    // PUBLIC METHODS
    // Set the selected fishing track in the select html element
    setSelectedFishingTrack: function(id){
      this.options.forEach(oo =>{
        if (id == oo.Id)
          this.selTrack = oo;
      });
    },

    

  },
  components: {

  },
  computed: {

  }
}
</script>

<style scoped>
#haul-info {
  font-size:12px;
}
</style>