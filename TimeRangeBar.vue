<template>
    <div id="app-timebar">

      <div class="container-flex position-absolute bottom-0 left-0 right-0" ref="hi" style="width:100%;">
      
        <range-slider @change="onRangeSliderChange($event)" style="height: 50px"></range-slider>
        
        <div class="timeline">
          <button class="yearButton m-0 p-0" @click="onYearClicked($event)" :key="yy.num" :id="yy.num" v-for="yy in years" :style="{width: yy.ww + '%'}">{{yy.num}}</button>
        </div>

        <div class="timeline" ref="monthTimeline">
          <button class="monthButton m-0 p-0" :key="mm.num" v-for="mm in months" :style="{width: mm.ww + '%'}">{{mm.name}}</button>
        </div>
        
      </div>
    </div>
</template>






<script>
// Import components
import RangeSlider from 'RangeSlider.vue'

export default {
    name: "app-timebar",
    created (){
      // Non-reactive variables this.$options.
      this.startDate = new Date(2018, 7, 21); // month + 1, e.g., 7 is August
      this.endDate = new Date();
      // Start and end dates if startDate and endDate are flexible
      this.limStartDate = new Date(2018, 7, 21); 
      this.limEndDate = new Date();

      // Month names
      this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      
    },
    mounted (){
      this.createHTMLTimeline();
    },
    setup() {
        
    },
    data (){
      return {
        months: [],
        years: [],
      }
    },
    methods: {
      // USER HTML ACTIONS
      onRangeSliderChange: function(rangeArray){
        //console.log(...rangeArray)
        if (rangeArray[0] < 0.1){          
          console.log(this.years);
        }
      },

      onYearClicked: function(event){
        let year = parseInt(event.target.id);
        this.startDate = new Date(year - 1, 11, 1);
        this.endDate = new Date(year + 1, 0, 31);

        // TODO instead of creating again months, set the width of the unseen elements to zero and then hid them.
        // This way we always have all the months and we just change the width. Animations then can work here
        
        this.months = []; // Vue does not read properly this.months, are some are left. Why?
        this.$nextTick(() => {
            this.createHTMLTimeline(); 
        });
        
      },

      // Creates the years and months arrays (HTML elements by vue) according to end and start date
      createHTMLTimeline: function(){
        let startMonth = this.startDate.getMonth() + 1;
        let startDay = this.startDate.getDate();
        let endMonth = this.endDate.getMonth();
        let endDay = this.endDate.getDate();
        
        // Calculate how many years (and a percentage of the year too)
        // Calculate how many months are between end and start date
        // Calculate how many days
        let startYear = this.startDate.getFullYear();
        let endYear = this.endDate.getFullYear();
        let totalYears = endYear - startYear;
        
        // Start and end year are different
        if (totalYears != 0){
          this.years = [{num: startYear, ww: (12-startMonth + (31-startDay)/31)/12}];// Todo: number of days is relative to the month
          this.months = [{num: startMonth -1, ww: (31-startDay)/31, key: (startMonth-1) + "-" + startYear, name: this.monthNum2Str(startMonth-1)}];
          // Fill months from first year
          for (let i = startMonth; i < 12; i++){
            this.months.push({num: i, ww: 1, key: i + "-" + startYear, name: this.monthNum2Str(i)});
          }

          // Fill years
          for (let i = 1; i<=totalYears; i++){
            if (startYear + i != endYear){
              this.years.push({num: startYear + i, ww: 1});
              // Fill months
              for (let j = 0; j<12; j++){
                this.months.push({num: j, ww: 1, key: j + "-" + (startYear+i), name: this.monthNum2Str(j)});
              }
            } else { // Last year is not necessarily complete
              this.years.push({num: endYear, ww: (endMonth + endDay/31)/12});// Todo: number of days is relative to the month
              // Fill months last year
              for (let j = 0; j<=endMonth; j++){
                if (j != endMonth)
                  this.months.push({num: j, ww: 1, key: j + "-" + (endYear), name: this.monthNum2Str(j)});
                else
                  this.months.push({num: j, ww: endDay/31, key: j + "-" + (endYear), name: this.monthNum2Str(j)});
              } 
            }
          }
        } 
        // Start and end year are the same
        else {
          this.years = [{num: startYear, ww: ((endMonth + endDay/31) - (12 - startMonth + (31-startDay)/31)) / 12}];
        }

        
        // Calculate ww according to number of years/months
        // For months
        let totalMonthWW = 0;
        this.months.forEach(mm => totalMonthWW += mm.ww); // Calculate total month proportion or width
        this.months.forEach(mm => mm.ww = 100 * mm.ww/totalMonthWW); // Apply width according to element width
        // For years
        let totalYearWW = 0;
        this.years.forEach(yy => totalYearWW += yy.ww); // Calculate total month proportion or width
        this.years.forEach(yy => yy.ww = 100 * yy.ww/totalYearWW); // Apply width according to element width
        
        //console.log(...this.months);

      },



      // Month num to Month string
      monthNum2Str: function(monthNum){
        return this.monthNames[monthNum];
      },


    },
    components: {
      'range-slider': RangeSlider
    },
    computed: {
      
    },
    
}
</script>




<style scoped>
.timeline {
  white-space:nowrap;
  overflow: hidden;
  position: relative;
  width: 100%;
  /* text-overflow:ellipsis; */ 
  height: 20px;

  font-size: 12;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(149, 224, 255,0.7)
}

.monthButton, .yearButton{
  height: 100%;
  border: 1px solid #02488e33;
  background: none;
}

.monthButton:hover, .yearButton:hover {
  background: #e3f8ff7d;
}
</style>