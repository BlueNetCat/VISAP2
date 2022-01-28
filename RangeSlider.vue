<template>
    <div id="app-rangeslider">
      <!-- https://javascript.info/mouse-drag-and-drop -->
      <div class="rangeslider position-absolute bottom-0 rigth-0 left-0" style="width:100%; height:10%;">

        <!-- Left handle https://unicode-table.com/en/2039/ -->
        <button @mousedown="onMouseDownLeftHandle" class="rangeHandle" ref="leftHandle" :style="{'left': posLeftHandle}">  	
          &#8249;
        </button>
        <!-- Right handle -->
        <button @mousedown="onMouseDownRightHandle" class="rangeHandle" ref="rightHandle" :style="{'left': posRightHandle}">
          &#8250;
        </button>
        
        <!-- Middle handle -->
        <button @mousedown="onMouseDownMiddleHandle" @dragstart="function(){return false}" class="rangeHandle rangeHandleMiddle" ref="middleHandle" :style="{'left': posMiddleHandle, 'width': middleHandleWidth}">
        </button>


        <div style="text-align: center">
          {{posLeftHandle}} , {{posRightHandle}}, {{posMiddleHandle}}
        </div>
      </div>
    </div>
</template>






<script>

export default {
    name: "app-rangeslider",
    created (){
      // Non-reactive variables this.$options.
      
    },
    mounted (){
      this.calcMiddleHandlePosition();
    },
    setup() {
        
    },
    data (){
      return {
        posLeftHandle: '25%',
        posRightHandle: '75%',
        posMiddleHandle: '28%',
        middleHandleWidth: '40%',

        // Spacing between side handles and middle handle
        paddingRatio: 0.1,
        maxPadding: 2,
      }
    },
    methods: {
      // USER HTML ACTIONS
      // Declare events for left handle
      onMouseDownLeftHandle: function(event){
        // Disable drag and drop support (is enabled sometimes without a reason) https://javascript.info/mouse-drag-and-drop
        event.target.ondragstart = function(){return false};
        // Create event listener for mouse move in document
        document.addEventListener('mousemove', this.onMouseMoveLeftHandle);
        // Create event listener for mouse up and remove mouse move event listener
        document.onmouseup = ()=>{
          this.$emit('change',  this.getRange());
          document.removeEventListener('mousemove', this.onMouseMoveLeftHandle);
          document.onmouoseup = null;
        };
        // Relocate on mouse down
        this.onMouseMoveLeftHandle(event);
      },

      // Declare events for right handle
      onMouseDownRightHandle: function(event){
        // Disable drag and drop support (is enabled sometimes without a reason) https://javascript.info/mouse-drag-and-drop
        event.target.ondragstart = function(){return false};
        // Create event listener for mouse move in document
        document.addEventListener('mousemove', this.onMouseMoveRightHandle);
        // Create and remove event listener for mouse up (removes previous event listener)
        document.onmouseup = ()=>{
          this.$emit('change',  this.getRange());
          document.removeEventListener('mousemove', this.onMouseMoveRightHandle);
          document.onmouoseup = null;
        };
        // Relocate on mouse down
        this.onMouseMoveRightHandle(event);
      },

      // Declare events for middle handle
      onMouseDownMiddleHandle: function(event) {
        // Disable drag and drop support (is enabled sometimes without a reason) https://javascript.info/mouse-drag-and-drop
        event.target.ondragstart = function(){return false};
        // Create event listener for mouse move in document
        document.addEventListener('mousemove', this.onMouseMoveMiddleHandle);
        // Create and remove event listener for mouse up (removes previous event listener)
        // Emit event with values
        document.onmouseup = ()=>{
          this.$emit('change', this.getRange());
          document.removeEventListener('mousemove', this.onMouseMoveMiddleHandle);
          document.onmouoseup = null;
        };
        // Relocate on mouse down
        this.onMouseMoveMiddleHandle(event);
      },

      // Move left handle
      onMouseMoveLeftHandle: function(event){
        let el = this.$refs.leftHandle; // Get element
        let totalWidth = el.parentElement.offsetWidth; // Get total width of container in pixels
        let percMargin = (100*(event.pageX - el.offsetWidth/2)/totalWidth); // Get margin from mouse position
        let percMarginRightHandle = parseFloat(this.posRightHandle.replace('%', '')); // Transform percent css format to float
        percMargin = Math.min(percMargin, percMarginRightHandle - 100*el.offsetWidth/totalWidth); // Limit on the right side
        percMargin = Math.max(percMargin, 0); // Limit on the left side
        this.posLeftHandle =  percMargin + "%";
        // Update middle bar
        this.calcMiddleHandlePosition();
        // Emit values
        this.$emit('change', this.getRange());
      },

      
      // Move right handle
      onMouseMoveRightHandle: function(event){
        let el = this.$refs.rightHandle; // Get element
        let totalWidth = el.parentElement.offsetWidth; // Get total width of container in pixels
        let percMargin = (100*(event.pageX - el.offsetWidth/2)/totalWidth); // Get margin from mouse position in percentage
        let percMarginLeftHandle = parseFloat(this.posLeftHandle.replace('%', '')); // Get position of other handle. Transform percent css format to float
        percMargin = Math.min(percMargin, 100 - 100*el.offsetWidth/totalWidth); // Limit on the right side
        percMargin = Math.max(percMargin, percMarginLeftHandle + 100*el.offsetWidth/totalWidth); // Limit on the left side
        this.posRightHandle =  percMargin + "%";
        // Update middle bar
        this.calcMiddleHandlePosition();
        // Emit values
        this.$emit('change', this.getRange());
      },


      // Move middle handle
      onMouseMoveMiddleHandle: function(event){
        let el = this.$refs.middleHandle;
        let totalWidth = el.parentElement.offsetWidth; // Get total width of container in pixels
        let percMargin = (100*(event.pageX - el.offsetWidth/2)/totalWidth); // Get margin from mouse position in percentage
        // Get positions of side handles in percentage
        let percMarginLeftHandle = parseFloat(this.posLeftHandle.replace('%', '')); // Transform percent css format to float
        let percMarginRightHandle = parseFloat(this.posRightHandle.replace('%', '')); // Transform percent css format to float
        // Get width of side handles
        let handleSideEl = this.$refs.leftHandle;
        let widthHandleLeft = 100*handleSideEl.offsetWidth/totalWidth;
        let widthHandleMiddle = 100*(el.offsetWidth)/totalWidth;
        // Limit movement
        let sidePadding = Math.min(this.paddingRatio * widthHandleMiddle * 0.5, this.maxPadding/2);
        percMargin = Math.min(percMargin, 100 - widthHandleMiddle - widthHandleLeft - sidePadding); // Right side
        percMargin = Math.max(percMargin, widthHandleLeft + sidePadding); // Left side

        // Calculate left and right handle positions (as in calcMiddleHandlePosition)
        this.posLeftHandle = percMargin - widthHandleLeft - sidePadding + "%";
        this.posRightHandle = percMargin + widthHandleMiddle + sidePadding + "%";
        this.posMiddleHandle = percMargin + '%';

        // Emit values
        this.$emit('change', this.getRange());
      },


      // Calculate width and position of middle handle
      calcMiddleHandlePosition: function(){
        let el = this.$refs.leftHandle;
        let totalWidth = el.parentElement.offsetWidth;
        let widthHandleLeft = 100*el.offsetWidth/totalWidth;

        let pRight = parseFloat(this.posRightHandle.replace('%', ''));
        let pLeft = parseFloat(this.posLeftHandle.replace('%', ''));
        
        let width = pRight - pLeft - widthHandleLeft;

        this.posMiddleHandle =  pLeft + widthHandleLeft + Math.min(this.paddingRatio * width * 0.5, this.maxPadding/2) + '%';
        this.middleHandleWidth = width - Math.min(width * this.paddingRatio, this.maxPadding) + '%';
      },



      // Get range in floats
      getRange: function(){
        let pLeft = parseFloat(this.posLeftHandle.replace('%', ''));
        let pRight = parseFloat(this.posRightHandle.replace('%', ''));
        return [pLeft, pRight];
      },

    },
    components: {

    },
    computed: {
      
    },
    
}
</script>




<style scoped>
.rangeslider {
  background-color: rgba(198, 239, 255, 0.8);
  width: 100%; 
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(0,0,0,.125);
}

.rangeHandle {
  position: absolute;  
  top: 0.5rem; 
  bottom: 0.5rem; 
  border:none;
  width: 1rem; 
  cursor: ew-resize;
  border-radius: 0.2rem;
  background-color: rgba(107, 193, 228, 0.8);
  color: rgba(4, 85, 117, 0.8);
  user-select: none
}

.rangeHandle:hover {
  background-color: rgba(84, 159, 189, 0.9);
}

.rangeHandleMiddle {
  opacity: 0.5;
  padding: 0;
}

</style>