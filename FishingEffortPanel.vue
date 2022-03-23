<template>
  <div id="fishing-effort" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Fishing Effort</h4>
    </div>
    
    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selEffortType == eType ? 'btn-active' : '']" @click='effortClicked' :key="eType" v-for="eType in effortTypes">{{eType}}</button>
      </div>
    </div>

    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selYear == yy ? 'btn-active' : '']" @click='yearClicked' :key="yy" v-for="yy in years">{{yy}}</button>
      </div>
    </div>

    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selGear == fg ? 'btn-active' : '']" @click='gearClicked' :key="fg" v-for="fg in fishingGears">{{fg}}</button>
      </div>
    </div>

    <!-- Layer visibility -->
    <div class="row p-3">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn m-2" :class="[layerOpacity > 0 ? '' : 'btn-active']" @click='layerVisClicked'>Layer visibility</button>
        <input class='slider m-2' type="range" min="0" max="1" step="0.01" v-model="layerOpacity" id="layerOpacity">
        <!-- <div class=''>{{layerOpacity}}</div> -->
      </div>
    </div>

    <!-- Effort example -->
    <div class="row p-3" style='justify-content: center;'>
      <img class='effortMap' ref='effortImg' :src='exampleImgURL'>
    </div>


  </div>
</template>




<script>
export default {
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
      layerOpacity: 0.8,

      selEffortType: 'hours',
      selYear: 2019,
      selGear: 'Bottom trawling',

      // https://www.emodnet-humanactivities.eu/view-data.php
      // https://ows.emodnet-humanactivities.eu/wms?LAYERS=2020_st_01_avg&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=-1,39,6,44&WIDTH=1024&HEIGHT=1024
      exampleImgURL: 'data/fishingEffortExample_m1_39_6_44.png'
      
    }
  },
  watch: {
    layerOpacity(vv){
      // TODO: callback to change layer opacity. vv is the opacity (from 0 to 1)
      this.$refs['effortImg'].style.opacity = vv*100 + '%';
      this.$emit('effortLayerOpacityChange', vv);
    },
    selEffortType(et){
      this.effortParamsChange();
    },
    selYear(et){
      this.effortParamsChange();
    },
    selGear(et){
      this.effortParamsChange();
    },
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
    effortParamsChange: function(){
      this.$emit('effortParamsChange', [this.selEffortType, this.selYear, this.selGear]);
    },




    // PUBLIC METHODS
    // foo: function(){
    // },

    

  },
  components: {

  },
  computed: {

  }
}
</script>

<style scoped>
.btn, #fishing-effort {
   font-size: 12px;
   
   border: 2px solid #02488e33;
}

.btn {
  background: rgba(198, 239, 255, 0.8);
  border: 2px solid #02488e33;
}

.btn-active {
  background: rgb(125 200 232);
}

.effortMap{
  border: 2px solid #02488e33;
  max-width: 200px;
  padding: 0px;
  border-radius: 9px;
}
</style>