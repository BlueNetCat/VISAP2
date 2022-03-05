<template>
  <div id="weather-widget" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Weather and sea conditions</h4>
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
    <div class="row p-2 g-0">
      <ul>
        <!-- Sea surface temperature -->
        <li style="list-style-position: inside;">
          Sea surface temperature: {{seaTemp}} ºC
          <div v-show='isLoading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li>
        <!-- Sea bottom temperature -->
        <li style="list-style-position: inside;">
          Sea bottom temperature: {{seaBottomTemp}} ºC
          <div v-show='isLoading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li>

        <!-- <li style="list-style-position: inside;">
          Sea surface temperature: {{seaTemp}} ºC
          <div v-show='isLoading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li> -->

        <!-- <li style="list-style-position: inside;">
          Sea surface temperature: {{seaTemp}} ºC
          <div v-show='isLoading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li> -->
      </ul>
    </div>

  </div>
</template>




<script>
export default {
  // REQUIRES WMSDataRetriever.js
  name: "weather-info",
  created(){
    this.dataRetriever = new WMSDataRetriever();
  },
  mounted(){
  },
  unmounted(){

  },
  data(){
    return {
      // Check https://es.wisuki.com/spot/2617/barceloneta for inspiration
      dataRows: [
        {
          name: "Sea temperature",
          abbr: "Sea t",
          units: 'ºC',
          elevation: true, // TODO: ALLOWS 2D PLOT IF CLICKED ON THE VARIABLE NAME ▼
          range: [10, 25],
          colorScale: 'boxfill/sst_36'
        },
        {
          name: "Sea bottom temperature",
          abbr: "Bottom t",
          units: 'ºC',
          range: [10, 25],
          colorScale: 'boxfill/sst_36'
        },
        {
          name: "Depth",
          abbr: "Depth",
          units: "m",
          range: [0, 1000],
          colorScale: 'boxfill/greyscale'
        },
        { // TODO
          name: "Wind",
          abbr: "Wind",
          units: "m/s", 
          range: [0, 15],
          colorScale: 'boxfill/sst_36'
        },
        { // TODO
          name: "Wind direction",
          abbr: "Dir",
          direction: true, // TODO
        },
        {
          name: "Wave significant height",
          abbr: "Waves",
          units: "m", 
          range: [0, 4],
          colorScale: 'boxfill/alg'
        },
        {
          name: "Wave direction",
          abbr: "Dir",
          units: "", 
          direction: true // TODO
        },
        {
          name: "Wave period",
          abbr: "period",
          units: "s", 
          range: [0,15],
          color: '#82b4f9' // TODO: color or colorScale. If color, go from transparent to the specified color.
        },

      ],
      isLoading: true,
      seaTemp: '',
      seaBottomTemp: '',
      sal: '',
      waveSignHeight: '',
      wind: '',
      chlor: '',
    }
  },
  methods: {
    // USER HTML ACTIONS
    // When a track is selected
    onClick: function(event){

    },

    // PRIVATE METHODS
    




    // PUBLIC METHODS
    getWeatherData: async function(){
      let ff = FishingTracks.getFeatureById(this.selTrack.Id);
      let coord = ff.geometry.coordinates[0];
      let lat = coord[1];
      let long = coord[0];
      let date = ff.properties.info.Data + 'T00:00:00.000Z';
      // Reset variables while loading
      // TODO: automatize all this
      this.seaTemp = '...';
      this.seaBottomTemp = '...';
      // Set loader
      let toLoad = 2;
      let loaded = 0;
      this.isLoading = true;
      this.dataRetriever.getDataAtPoint("Sea temperature", date, lat, long, 'd')
        .then(value => {
          loaded++;
          this.seaTemp = value.toFixed(2);
          if (loaded == toLoad)
            this.isLoading = false;
        })
        .catch(error => console.error(error));

      this.dataRetriever.getDataAtPoint("Sea bottom temperature", date, lat, long, 'd')
        .then(value => {
          loaded++;
          this.seaBottomTemp = value.toFixed(2);
          if (loaded == toLoad)
            this.isLoading = false;
        })
        .catch(error => console.error(error));
    }

    

  },
  components: {

  },
  computed: {

  }
}
</script>

<style scoped>
#weather-widget {
  font-size:12px;
}
</style>