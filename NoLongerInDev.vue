<template>
  <!-- Container -->
  <div id="nolongerindev">

    <p>Aquesta aplicació s'ha deixat de desenvolupar i mantenir en aquest lloc. L'aplicació continua en desenvolupament a <a href="https://icatmar.cat/visors/visor-pesquer/">el visor d'ICATMAR</a></p>

    <p>Esta aplicación ha dejado de ser desarrollada y mantenida en este sitio web. La aplicación continua en desarrollo en <a href="https://icatmar.cat/es/visores/visor-de-pesca/">el visor de ICATMAR</a>.</p>

    <p>This app is no longer mantained here. Please go to <a href="https://icatmar.cat/en/viewers/fishery-viewer/">ICATMAR's website</a> for its most recent version.</p>

    <button @click="buttonClicked">{{ $t('Close') }}</button>

  </div>
    
</template>

  
  
<script>
  
  
  
  // Import components

  export default {
    name: "nolongerindev",
    created(){
      
    },
    mounted () {
  
    },
    data () {
      return {
        
      }
    },
    methods: {
      buttonClicked: function(e){
        this.$emit('closed');
      }
    },
    components: {

    },
    computed: {
    
    }
  }
  
  
</script>
  
  
  
  
  
<style scoped>

  #nolongerindev {
    position: absolute;
    margin: auto;
    z-index: 100;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 4px black;

    display: flex;
    flex-direction: column;
  }

</style>