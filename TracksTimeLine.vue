<template>
    <div id="tracks-timeline">
        <!-- A div with the same width as TimeRange -->
        <div class="container-flex maindiv position-absolute  left-0 right-0" style="user-select: none; right: 0; bottom: 120px; z-index: 1; opacity: 1; left: 130px">
            <div :key="ff.properties.id" v-for="ff in features" :style="setFeatureStyle(ff)">
                &#11044;
            </div>
        </div>

    </div>
</template>


<script>
// Import components here

export default {
  name: "tracks-timeline",
  created(){
    this.portOrder= {
      "Sant Carles de la Ràpita": 9,
      "L'Ametlla de Mar": 8,
      "Tarragona": 7,
      "Vilanova i la Geltrú": 6,
      "Barcelona": 5,
      "Arenys de Mar": 4,
      "Blanes": 3,
      "Palamós": 2,
      "L'Escala": 1,
      "Roses": 0,
    };

  },
  mounted () {

  },
  data () {
    return {
      startDate: new Date(2018, 7, 21),
      endDate: new Date(),
      features: [],
    }
  },
  methods: {
    // INTERNAL METHODS
    setFeatureStyle: function(ff){
      // Current date
      let currDate = new Date(ff.properties.info.Date);
      // Visibility
      let visible = currDate > this.startDate && currDate < this.endDate;

      // Left position according to start and end date
      let leftPercentage = 100*(currDate.getTime() - this.startDate.getTime()) / (this.endDate.getTime() - this.startDate.getTime());
      // Limit on the right side to avoid overflow
      leftPercentage = Math.min(97, leftPercentage);
      // Opacity on the edges
      let opacity = 1;
      if (leftPercentage < 10)
        opacity = leftPercentage/10;
      else if (leftPercentage > 90)
        opacity = (100-leftPercentage)/10;
      // Port
      let port = ff.properties.info.Port;
      // Top position according to port
      let top = this.portOrder[port];

      // Color according to port from palette.js
      let colorPort = palette ? palette[port].color : [255, 0,0];

      if (visible){
        return {
          color: 'rgba(' + colorPort + ',0.5)',
          'font-size': '0.5rem',
          position: 'absolute',
          left: leftPercentage + '%',
          top: top*2 + 'px',
          opacity: opacity,
          '-webkit-text-stroke-width': '0.5px',
        '-webkit-text-stroke-color': 'black',
        }
      // If it is not visible, hide it
      } else {
        return {
          'font-size': '0.5rem',
          position: 'absolute',
          left: '0%',
          top: '0px',
          opacity: 0, 
        }
      }
    },

    // PUBLIC METHODS
    // Set the geojson features
    setFeatures: function(inFeatures){
      this.features = inFeatures;
    },
    // Set start and end dates
    setStartEndDates: function(sDate, eDate){
      this.startDate.setTime(sDate.getTime());
      this.endDate.setTime(eDate.getTime());
      //this.features.pop();
      this.features.push([]);
      this.features.pop();
    },

  },
  components: {
  },
  computed: {
  
  }
}


</script>





<style scoped>

.maindiv {
  background: rgba(198, 239, 255, 0.8);
}

</style>