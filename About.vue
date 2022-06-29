<template>
  <div id="about-panel" class="p-4 container-fluid">
    <!-- Row - Title -->
    <div class="row p-3">
      <h4>{{$t('About')}}</h4>
      <!-- Text -->
      <p>{{$t('Sentence1')}} </p>
    </div>
    

    <!-- Row - Title -->
    <div class="row p-3">
      <h5>{{$t('About ICATMAR')}}</h5>
      <!-- Text -->
      <p>{{$t('Sentence2')}} </p>
      <p>{{$t('Sentence3')}} </p>
      <p>{{$t('Sentence4')}} </p>
    </div>

    <!-- Row - Title -->
    <div class="row p-3">
      <h5>{{$t('Contact')}}</h5>
      <p>{{$t('SentenceContact')}} </p>
      <a href="https://www.bluenetcat.eu" title="BlueNetCat" target="_blank">BlueNetCat</a>
      <a href="http://agricultura.gencat.cat/ca/departament/dar_plans_programes_sectorials/politica-maritima/icatmar/" title="ICATMAR" target="_blank">ICATMAR</a>
      <a href="https://github.com/BlueNetCat/VISAP2" title="Code" target="_blank">{{$t("Code repository")}}</a>

    </div>

    <!-- Row - Title -->
    <div class="row p-3">
      <h5>{{$t('Funding')}}</h5>
      <p>{{$t('SentenceFunding')}} </p>
      <img src="img/Logos.png">
    </div>


  </div>
</template>
<i18n>
{
  "en": {
    "About": "About us",
    "About ICATMAR": "About ICATMAR",
    "Contact": "Contact",
    "Funding": "Funding",
    "Code repository": "Code repository",
    "Sentence1": "This application is a viewer of the data collected by ICATMAR to carry out scientific monitoring of fisheries, transfer the knowledge acquired and facilitate the management of fishing on the Catalan coast. The application has been developed by the Catalan Maritime Network (BlueNetCat) in collaboration with ICATMAR. Currently the application only shows the bottom trawling data.",
    "Sentence2": "ICATMAR (Catalan Research Institute for the Governance of the Sea) is a cooperation body between the General Directorate of Maritime Policy and Sustainable Fisheries (Generalitat de Catalunya) and the Institute of Marine Sciences (ICM-CSIC) with management autonomy, which arises from the need for scientific advice to develop the program of the Maritime Strategy of Catalonia.",
    "Sentence3": "A team made up of sixteen technicians specialized in marine biological sciences and in computer tools for geolocation and information support, coordinated and advised by researchers from the Department of Renewable Marine Resources of the Institute of Marine Sciences of Barcelona, have been the material authors of the scientific follow-up that has been aimed at maritime fisheries in both their commercial and recreational aspects.",
    "Sentence4": "In October 2018, the monitoring program for the species of greatest fishing interest was launched, where one of the key elements is the collection of data and their structuring so that they can be analyzed and visualized.",
    "SentenceContact": "For inquiries about the application, please contact Gerard Llorach (gllorach at bluenetcat.eu). For inquiries about the data, please contact Jordi Ribera (jribera at icm.csic.es).",
    "SentenceFunding": "Xarxa Marítima de Catalunya (BlueNetCat) is financed by the Generalitat de Catalunya and by the European Regional Development Fund (ERDF)."
  },
  "es": {
    "About": "Acerca de nosotros",
    "About ICATMAR": "Acerca de ICATMAR",
    "Contact": "Contacto",
    "Funding": "Financiamiento",
    "Code repository": "Repositorio del código",
    "Sentence1": "Esta aplicación es un visualizador de los datos recogidos por ICATMAR para realizar un monitoreo científico de las pesquerías, transferir los conocimientos adquiridos y facilitar la gestión de la pesca en la costa catalana. La aplicación ha sido desarrollada por la Xarxa Marítima de Catalunya (BlueNetCat) en colaboración con ICATMAR. Actualmente la aplicación sólo enseña los datos del muestreo en la flota de arrastre.",
    "Sentence2": "El ICATMAR (Instituto Catalán de Investigación para la Gobernanza del Mar) es un órgano de cooperación entre la Dirección General de Política Marítima y Pesca Sostenible (Generalitat de Catalunya) y el Instituto de Ciencias del Mar (ICM-CSIC) con autonomía de gestión, que nace de la necesidad de asesoramiento científico para desarrollar el programa de la Estrategia Marítima de Catalunya.",
    "Sentence3": "Un equipo formado por dieciséis técnicos especializados en ciencias biológicas del ámbito marino y en herramientas informáticas de geolocalización y soporte a la información, coordinados y asesorados por investigadores del Departamento de Recursos Marinos Renovables del Instituto de Ciencias del Mar de Barcelona, han sido los autores materiales del seguimiento científico que ha ido dirigido a las pesqueras marítimas en sus vertientes tanto comercial como recreativa.",
    "Sentence4": "En Octubre de 2018 se puso en marcha el programa de seguimiento de las especies de mayor interés pesquero, donde uno de los elementos clave es la recopilación de datos y su estructuración para poder ser analizadas y visualizadas.",
    "SentenceContact": "Si necesita más información sobre la aplicación, puede contactar con Gerard Llorach (gllorach at bluenetcat.eu). Si necesita más información sobre los datos, puede contactar con Jordi Ribera (jribera at icm.csic.es).",
    "SentenceFunding": "La Xarxa Marítima de Catalunya (BlueNetCat) está financiada por la Generalitat de Catalunya y el Fondo Europeo de Desarrollo Regional (FEDER)."
  },
  "ca": {
    "About": "Sobre nosaltres",
    "About ICATMAR": "Sobre ICATMAR",
    "Contact": "Contacte",
    "Funding": "Finançament",
    "Code repository": "Repositori del codi",
    "Sentence1": "Aquesta aplicació és un visualitzador de les dades recollides per ICATMAR per fer un monitoreig científic de les pesqueries, transferir els coneixements adquirits i facilitar la gestió de la pesca a la costa catalana. L'aplicació ha estat desenvolupada per la Xarxa Marítima de Catalunya (BlueNetCat) en col·laboració amb ICATMAR. Actualment l'aplicació només ensenya les dades del mostreig a la flota d'arrossegament.",
    "Sentence2": "L'ICATMAR (Institut Català de Recerca per a la Governança de la Mar) és un òrgan de cooperació entre la Direcció General de Política Marítima i Pesca Sostenible (Generalitat de Catalunya) i l'Institut de Ciències del Mar (ICM-CSIC) amb autonomia de gestió, que neix de la necessitat d'assessorament científic per desenvolupar el programa de l'Estratègia Marítima de Catalunya.",
    "Sentence3": "Un equip format per setze tècnics especialitzats en ciències biològiques de l'àmbit marí i en eines informàtiques de geolocalització i de suport a la informació, coordinats i assessorats per  investigadors del Departament de Recursos Marins Renovables de l'Institut de Ciències del Mar de Barcelona, han estat els autors materials del seguiment científic que ha anat dirigit a les pesqueres marítimes en les vessants tant comercial com recreativa.",
    "Sentence4": "A l'Octubre de 2018 es va posar en marxa el programa de seguiment de les especies de major interès pesquer, on un dels elements clau és la recopilació de dades i la seva estructuració per a poder ser analitzades i visualitzades.",
    "SentenceContact": "En cas de voler més informació sobre l'aplicació, podeu contactar amb en Gerard Llorach (gllorach at bluenetcat.eu). En cas de voler més informació sobre les dades, podeu contactar amb en Jordi Ribera (jribera at icm.csic.es).",
    "SentenceFunding": "La Xarxa Marítima de Catalunya (BlueNetCat) està finançada per la Generalitat de Catalunya i el Fons Europeu de Desenvolupament Regional (FEDER)."
  }
}
</i18n>



<script>
export default {
  name: "about-panel",
}
</script>

<style scoped>
#about-panel {
   font-size: 12px
}

p {
  text-align: justify;
}


a:link { color: #808080; }
a:visited { color: #808080; }
a:hover { color: #424242; }
a:active { color: #000000; }
</style>