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
          <th class="wcol" :key="dd" v-for="dd in daysString">
            {{dd}}
          </th>
        </tr>
      </thead>
      <!-- Table body - Variables -->
      <tbody>
        <!-- Row -->
        <tr :key="dR.name" v-for="(dR, index) in dataRows">
          <!-- Row name -->
          <th scope="row">{{dR.name}} ({{dR.units}})</th>
          <!-- Values -->
          <td class="wcol" :key="dd.value" v-for="dd in dataRows[index].data">
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
        dr.data[i] = {value: '', loading: true};
    });
    // Create dates
    let today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    this.dates = [];
    for (let i = 0; i < 7; i++){
      this.daysString[this.daysString.length-1 - i] = today.toDateString().substring(0,3) + ' ' + today.getDate();
      this.dates[this.daysString.length-1 - i] = new Date(today.getTime());
      today.setDate(today.getDate() - 1);
    }
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
          name: "Wind",
          abbr: "Wind",
          units: "m/s", 
          range: [0, 15],
          colorScale: 'boxfill/sst_36'
        },
        { 
          name: "Wind direction",
          abbr: "Dir",
          units: "º",
          direction: true, 
          layer: "Wind",
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
          units: "º", 
          direction: true, 
          layer: "Wave significant height",
        },
        {
          name: "Wave period",
          abbr: "T",
          units: "s", 
          range: [0,15],
          color: '#82b4f9' // TODO: color or colorScale. If color, go from transparent to the specified color.
        },
        {
          name: "Chlorophyll",
          abbr: "Chl",
          units: "mg/m3", 
          range: [0,1.5],
          color: '#82f988'
        },

      ],
      daysString: [1,2,3,4,5,6,7],
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
      let lat = 41.5; let long = 3;
      this.dataRows.forEach((rr, rIndex) => {
        this.dates.forEach((date, dIndex) => {
          let layerName = rr.direction ? rr.layer : rr.name;
          this.dataRetriever.getDataAtPoint(layerName, date.toISOString(), lat, long, 'd', rr.direction)
          .then(value => {
            rr.data[dIndex].value = value.toFixed(2);
            rr.data[dIndex].loading = false;
          })
          .catch(error => {
            console.error(error);
            rr.data[dIndex].value = 'x';
            rr.data[dIndex].loading = false;
          });
        });
      })
      
      
    },




    // PUBLIC METHODS

    

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
  /* display: flex; 
  flex-direction: column; */
  width: 100%;
  /* border:black;
  border-style: solid; */
}

.wrow {
  /* display: flex;
  flex-direction: row; */
  /* border:rgb(95, 95, 95);
  border-style: solid; */
}

.wcol {
  border:rgb(252, 252, 252);
  border-style: solid;
  /* flex-grow: 1; */
  text-align: center;
  align-items: center;
}
</style>