<template>
  <!-- Container -->
  <div id="weather-widget" class="wcontainer">
    
    <!-- Table -->
    <table>
      <!-- Table Head - Days -->
      <thead>
        <tr>
          <td></td>
          <!-- Col for each day -->
          <th class="wcol" :key="dd" v-for="dd in days">{{dd}}, </th>
        </tr>
      </thead>
      <!-- Table body - Variables -->
      <tbody>
        <!-- Row -->
        <tr>
          <!-- Row name -->
          <th scope="row">Sea Temperature</th>
          <!-- Values -->
          <td class="wcol" :key="dd.value" v-for="dd in dataRows[0].data">
            <div v-show='dd.loading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span v-show='!dd.loading'>{{dd.value}}</span>
          </td>
        </tr>
      </tbody>


    </table>




  </div>
</template>




<script>
export default {
  // REQUIRES WMSDataRetriever.js
  name: "weather-info",
  created(){
    this.dataRetriever = new WMSDataRetriever(this.getData);
    // Create data array inside dataRows
    this.dataRows.forEach(dr => {
      dr.data = [];
      for (let i = 0; i < 7; i++)
        dr.data[i] = {value: '10', loading: true}
    });
    
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
          elevation: true, // TODO: ALLOWS 2D PLOT IF CLICKED ON THE VARIABLE NAME ▼?
          range: [10, 25],
          colorScale: 'boxfill/sst_36',
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
      days: [1,2,3,4,5,6,7],
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
    getData: function(){
      // Get data (now only sea temperature)
      let date = new Date();
      let lat = 41.5; let long = 3;
      console.log("here")
      this.dataRetriever.getDataAtPoint("Sea temperature", date.toISOString(), lat, long, 'd')
        .then(value => {
          this.dataRows[0].data[0].value = value.toFixed(2);
          this.dataRows[0].data[0].loading = false;
        })
        .catch(error => console.error(error));
    },




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
.wcontainer {
  font-size:12px;
  display: flex; 
  flex-direction: column;
  width: 100%;
  /* border:black;
  border-style: solid; */
}

.wrow {
  display: flex;
  flex-direction: row;
  /* border:rgb(95, 95, 95);
  border-style: solid; */
}

.wcol {
  border:rgb(252, 252, 252);
  border-style: solid;
  flex-grow: 1;
  text-align: center;
  align-items: center;
}
</style>