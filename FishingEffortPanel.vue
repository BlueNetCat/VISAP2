<template>
  <div id="fishing-effort" class="p-4 container-fluid">
    <!-- Row -->
    <div class="row p-3">
      <h4>Fishing Effort</h4>
    </div>
    
    <!-- Button group -->
    <div class="row p-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn" :class="[selEffortType == eType ? 'btn-active' : '']" @click='effortClicked' :key="eType" v-for="eType in effortTypes">
          {{ $t('effortTypes.'+ eType)}}
        </button>
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
        <button type="button" class="btn" :class="[selGear == fg ? 'btn-active' : '']" @click='gearClicked' :key="fg" v-for="fg in fishingGears">
          {{ $t('fishingGears.' + fg)}}
        </button>
      </div>
    </div>

    <!-- Layer visibility -->
    <div class="row p-3">
      <div class="d-flex flex-row justify-content-center align-self-center">
        <button class="btn m-2" :class="[layerOpacity > 0 ? '' : 'btn-active']" @click='layerVisClicked'>
          {{ $t('Layer visibility')}}
          
        </button>
        <input class='slider m-2' type="range" min="0" max="1" step="0.01" v-model="layerOpacity" id="layerOpacity">
        <!-- <div class=''>{{layerOpacity}}</div> -->
      </div>
    </div>

    <!-- Effort example -->
    <div class="row p-3" style='justify-content: center;'>
      <img class='effortMap' ref='effortImg' :src='exampleImgURL' @error="onImageNotFound($event)">
    </div>

    <div class="row p-3">
      <i>{{$t('Data from')}} <a href="https://www.emodnet-humanactivities.eu/search-results.php?dataname=Vessel+Density+" target="_blank" rel="noreferrer noopener">EMODnet Human Activities, Vessel Density Map (Collecte Localisation Satellites (CLS)) </a></i>
    <div>


  </div>
</template>
<i18n>
  {
    "en": {
      "effortTypes": {
        "hours": "hours",
        "kg": "kg",
        "euros": "euros"
      },
      "fishingGears": {
        "All": "All",
        "Bottom trawling": "Bottom trawling",
        "Purse seine": "Purse seine"
      },
      "Layer visibility": "Layer Visibility",
      "Data from": "Data from"
    },

    "es": {
      "effortTypes": {
        "hours": "horas",
        "kg": "kg",
        "euros": "euros"
      },
      "fishingGears": {
        "All": "Todo",
        "Bottom trawling": "Pesca de arrastre",
        "Purse seine": "Pesca de cerco"
      },
      "Layer visibility": "Visibilidad de la capa",
      "Data from": "Datos de"
    },

    "ca": {
      "effortTypes": {
        "hours": "hores",
        "kg": "kg",
        "euros": "euros"
      },
      "fishingGears": {
        "All": "Tot",
        "Bottom trawling": "Pesca d'arrossegament",
        "Purse seine": "Pesca d'encerclament"
      },
      "Layer visibility": "Visibilitat de la capa",
      "Data from": "Dades de"
    }
  }
  </i18n>



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
      years: [2018, 2019, 2020, 2021],
      fishingGears: ['All', 'Bottom trawling', 'Purse seine'],
      layerOpacity: 0.8,

      selEffortType: 'hours',
      selYear: 2020,
      selGear: 'All',

      // https://www.emodnet-humanactivities.eu/view-data.php
      // https://ows.emodnet-humanactivities.eu/wms?LAYERS=2020_st_01_avg&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=-1,39,6,44&WIDTH=1024&HEIGHT=1024
      exampleImgURL: 'data/fishingEffortExample_m1_39_6_44.png'
      
    }
  },
  watch: {
    layerOpacity(vv){
      this.$refs['effortImg'].style.opacity = vv*100 + '%';
      // Callback to change layer opacity. vv is the opacity (from 0 to 1)
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
      let selGear = this.selGear.toLowerCase();
      selGear = selGear.replace(' ', '');
      let outUrl = 'data/fishingEffort_' + this.selEffortType + '_' +  this.selYear + '_' + selGear + '.png';
        this.$refs['effortImg'].src = outUrl;
      this.$emit('effortParamsChange', outUrl);
    },

    onImageNotFound: function(e){
      let imgEl = e.currentTarget;
      imgEl.src = 'https://bluenetcat.github.io/img/noData.png';
    },




    // PUBLIC METHODS
    setLayerOpacity: function(opacity){ // Event coming from LayerPanel.vue
      this.layerOpacity = opacity;
    }

    

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

/* unvisited link */
a:link { color: #808080; }

/* visited link */
a:visited { color: #808080; }

/* mouse over link */
a:hover { color: #424242; }

/* selected link */
a:active { color: #000000; }
</style>