<template>
  <div id="fishing-effort" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Fishing Effort</h4>
    </div>
    
    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selEffortType == eType ? 'btn-dark' : 'btn-light']" @click='effortClicked' :key="eType" v-for="eType in effortTypes">{{eType}}</button>
      </div>
    </div>

    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selYear == yy ? 'btn-dark' : 'btn-light']" @click='yearClicked' :key="yy" v-for="yy in years">{{yy}}</button>
      </div>
    </div>

    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selGear == fg ? 'btn-dark' : 'btn-light']" @click='gearClicked' :key="fg" v-for="fg in fishingGears">{{fg}}</button>
      </div>
    </div>

    <!-- Layer visibility -->
    <div class="row p-3">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn " :class="[layerOpacity > 0 ? 'btn-dark' : 'btn-light']" @click='layerVisClicked'>Layer visibility</button>
        <input class='slider' type="range" min="0" max="1" step="0.01" v-model="layerOpacity" id="layerOpacity">
        <div class=''>{{layerOpacity}}</div>
      </div>
    </div>


  </div>
</template>




<script>
export default {
  // REQUIRES FishingTracks.js
  name: "fishing-effort",
  created(){

  },
  mounted(){

  },
  unmounted(){

  },
  data(){
    return {
      effortTypes: ['hours', 'kg', 'euros'],
      years: [2019, 2020, 2021],
      fishingGears: ['Bottom trawling', 'Purse seine'],
      layerOpacity: 1,

      selEffortType: 'hours',
      selYear: 2019,
      selGear: 'Bottom trawling',

      
    }
  },
  watch: {
    layerOpacity(vv){
      // TODO: callback to change layer opacity
    }
  },
  methods: {
    // USER HTML ACTIONS
    effortClicked: function(e){
      this.selEffortType = e.target.innerText;
    },

    yearClicked: function(e){
      this.selYear = e.target.innerText;
    },

    gearClicked: function(e){
      this.selGear = e.target.innerText;
    },

    layerVisClicked: function(e){
      this.layerOpacity = this.layerOpacity == 0 ? 0.8 : 0;
    },

    

    // PRIVATE METHODS
    foo: function(){
      
    },




    // PUBLIC METHODS
    foo: function(){
    },

    

  },
  components: {

  },
  computed: {

  }
}
</script>

<style scoped>
.btn, #fishing-effort {
   font-size: 12px
}
</style>