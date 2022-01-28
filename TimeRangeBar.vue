<template>
    <div id="app-timebar">

      <div class="container-flex position-relative p-0 m-0" style="z-index: 1000">
        <div class="row m-0">
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
        </div>
      </div>

      <range-slider @change="onRangeSliderChange($event)"></range-slider>

    </div>
</template>






<script>
// Import components
import RangeSlider from 'RangeSlider.vue'

export default {
    name: "app-timebar",
    created (){
      // Non-reactive variables this.$options.
      
    },
    mounted (){
      
    },
    setup() {
        
    },
    data (){
      return {

      }
    },
    methods: {
      onRangeSliderChange: function(rangeArray){
        console.log(...rangeArray)
      }

    },
    components: {
      'range-slider': RangeSlider
    },
    computed: {
      
    },
    
}
</script>




<style scoped>
</style>