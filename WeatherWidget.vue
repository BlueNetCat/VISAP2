<template>
  <!-- Container -->
  <div id="weather-widget" class="wcontainer p-1">
    
    <!-- Table -->
    <table>
      <!-- Table Head - Days -->
      <thead>
        <tr>
          <td></td>
          <!-- Col for each day -->
          <th class="wcol" :key="dd" v-for="(dd, index) in daysString" :title="dates[index].toISOString()">
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
            <div v-if='dd.loading' class="spinner-border text-dark" style="width: 1rem; height: 1rem; position: relative; margin-left: 10px" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else-if='dR.direction' :style="{'transform': 'rotate('+ (-dd.value - 90) +'deg)'}" :title="dd.value + 'º'">&#10140;</div>
            <div v-else-if='!dd.loading' :style="getStyle(dR, dd)">{{dd.value}}</div>
            
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
    
    // Create data array inside dataRows
    this.dataRows.forEach(dr => {
      dr.data = [];
      for (let i = 0; i < this.numDays; i++)
        dr.data[i] = {value: '', loading: true};
    });
    // Create dates
    let today = new Date();
    //today.setFullYear(today.getFullYear() - 1);
    today.setDate(today.getDate() + 5);
    this.dates = [];
    for (let i = 0; i < this.numDays; i++){
      this.daysString[this.numDays-1 - i] = today.toDateString().substring(0,3) + ' ' + today.getDate();
      this.dates[this.numDays-1 - i] = new Date(today.getTime());
      today.setDate(today.getDate() - 1);
    }

    // Create data retreiver
    this.dataRetriever = new WMSDataRetriever();
    this.getData();
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
          name: "Wind",
          abbr: "Wind",
          units: "m/s", 
          range: [0, 30],
          signRange: [5,15],
          color: '#ebb071',//'#71c3eb',
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
          range: [0, 8],
          signRange: [0.5,4],
          color: '#ebb071',//'#71c3eb',
          colorScale: 'boxfill/alg',
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
          range: [0,25],
          signRange: [8,15],
          color: '#82b4f9' // TODO: color or colorScale. If color, go from transparent to the specified color.
        },
        {
          name: "Sea surface velocity",
          abbr: "Current",
          units: "m/s",
          range: [0, 3],
          signRange: [0.25, 1],
          color: '#ebb071',//'#71c3eb',
        },
        {
          name: "Sea current direction",
          abbr: "Dir",
          units: "m/s",
          direction: true,
          layer: "Sea surface velocity",
          color: '#ebb071',//'#71c3eb',
        },
        {
          name: "Chlorophyll",
          abbr: "Chl",
          units: "mg/m3", 
          range: [0, 2.5],
          signRange: [0.5,1],
          color: '#82f988'
        },
        {
          name: "Salinity",
          abbr: "Sal",
          units: "‰", 
          range: [30, 45],
          signRange: [38, 40],
          color: '#ebb071'
        },
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
      ],
      numDays: 15,
      daysString: [],
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



    getStyle: function(dR, dd){
      let color = dR.color;
      let range = dR.signRange ? dR.signRange : dR.range; // Significant range
      let value = dd.value;

      let alpha = 255*(value - range[0]) / (range[1] - range[0]);

      let textWeight = 'normal';
      if (dR.signRange){
        if (value > (range[0] + 0.33*(range[1]-range[0])))
          textWeight = 'bold';
        else if (value > (range[0] + 0.66*(range[1]-range[0])))
          textWeight = 'bolder';
      }

      return {
        'background-color': color + alpha.toString(16).split('.')[0],
        'font-weight': textWeight
      }
    }




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
  text-align: center;
}

.wcol {
  border:rgb(252, 252, 252);
  border-style: solid;
  /* flex-grow: 1; */
  text-align: center;
  align-items: center;
  padding: 2px;
}
</style>