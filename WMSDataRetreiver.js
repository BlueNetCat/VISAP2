// Scripts that obtain data from the CMEMS WMS API


// CMEMS base url
const domainURL = "https://nrt.cmems-du.eu/thredds/wms/";

// Variables:
var dataTypes = {
  "Sea surface velocity": {
    name: 'Sea surface velocity',
    url: 'med-cmcc-cur-an-fc',
    layerName: 'sea_water_velocity',
    timeScales: ['h', 'h3', 'h6', 'h12', 'd', 'd3', 'm'],
    range: [0, 1.5],
    units: 'm/s',
    style: "boxfill%2Foccam",//"vector%2Foccam",
    animation: {
      layerNames: ['uo', 'vo'], // East, North
      format: 'east_north',
      type: 'velocity'
    },
  },
  "Sea temperature": {
    name: 'Sea temperature',
    url: 'med-cmcc-tem-an-fc',
    layerName: 'thetao',
    timeScales: ['h', 'h3', 'h6', 'h12', 'd', 'd3', 'm'],
    range: [10, 32],
    units: 'ºC',
    style: "boxfill%2Foccam",
  },
  "Salinity": {
    name: 'Salinity',
    url: 'med-cmcc-sal-an-fc',
    layerName: 'so',
    timeScales: ['h', 'h3', 'h6', 'h12', 'd', 'd3', 'm'],
    range: [32, 41],
    units: '‰',
    style: "boxfill%2Foccam",
  },
  "Wave significant height": {
    name: 'Wave significant height',
    url: 'med-hcmr-wav-an-fc',
    layerName: 'VHM0', // 'VMDR' for direction in degrees
    timeScales: ['h', 'h3', 'h6', 'h12'],
    range: [0, 6],
    units: 'm',
    style: "boxfill/alg",//occam_pastel-30",
    animation: {
      layerNames: ['VHM0', 'VMDR'], // Intensity, Angle
      format: 'value_angle',
      type: 'wave'
    },
  },
  "Wind wave significant height": {
    name: 'Wind wave significant height',
    url: 'med-hcmr-wav-an-fc',
    layerName: 'VHM0_WW', // 'VMDR' for direction in degrees
    timeScales: ['h', 'h3', 'h6', 'h12'],
    range: [0, 6],
    units: 'm',
    style: "boxfill/sst_36", //occam_pastel-30",
    animation: {
      layerNames: ['VHM0_WW', 'VMDR_WW'], // Intensity, Angle
      format: 'value_angle',
      type: 'whiteWave'
    },
  },
  "Wave period": {
    name: 'Wave period',
    scientificName: 'Sea surface wave mean period from variance spectral density inverse frequency moment',
    url: 'med-hcmr-wav-an-fc',
    layerName: 'VTM10', // Check out other period measures
    timeScales: ['h', 'h3', 'h6', 'h12'],
    range: [0, 18],
    units: 's',
    style: "boxfill/sst_36", //occam_pastel-30",
  },
  'Chlorophyll': {
    name: 'Chlorophyll',
    url: 'med-ogs-pft-an-fc',
    layerName: 'chl',
    timeScales: ['d', 'd3', 'm'],
    range: [0.01, 1],
    units: 'mg/m3',
    style: 'boxfill%2Foccam',
    // https://nrt.cmems-du.eu/thredds/wms/med-ogs-pft-an-fc-d?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&TILED=true&COLORSCALERANGE=0.028321734%2C2.3005204&ELEVATION=-1.0182366371154785&LAYERS=chl&STYLES=boxfill%2Frainbow&TIME=2021-10-06T12%3A00%3A00.000Z&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&BBOX=28.125%2C16.875%2C33.75%2C22.5
  },
}



// Create object with CMEMS product urls
// https://resources.marine.copernicus.eu/products
var oceanProducts = {};
let timeScales = ["h", "d", "m"];
// Iterate over data types
Object.keys(dataTypes).forEach(dataTypeKey => {
  let dataType = dataTypes[dataTypeKey];
  dataType.timeScaleCorrection = {}; // Introduce new field for time corrections (daily forecast sometimes has 12h instead of 00h)
  // Get the ocean product if exists
  let oceanProd = undefined;
  Object.keys(oceanProducts).forEach(oP => {if (oP.id == dataType.url) oceanProd = oP});
  if (oceanProd == undefined){
    // Create ocean product object
    // Iterate over timescales
    for (let i = 0; i < timeScales.length; i++) {
      let currTimeScale = timeScales[i];
      // Skip if time scale is not present in datatype
      if (dataType.timeScales.includes(currTimeScale)){
        let oPURL = dataType.url + "-" + currTimeScale;
        // Get Capabilities url
        let capabilitiesURL = domainURL + oPURL + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";
        // fetch
        console.log(capabilitiesURL);
        fetch(capabilitiesURL).then(response => response.text())
          .then(data => {
            const parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            let layers = xml.querySelectorAll('Layer');
            // Iterate through layers
            layers.forEach(ll => {
              // Get layer by its name
              if (ll.querySelector("Name").innerHTML == dataType.layerName && ll.attributes.queryable) {
                console.log("Layer name: " + ll.querySelector("Name").innerHTML + ", Variable name: " + dataType.name);
                //debugger;
                //console.log(ll);
                ll.querySelectorAll("Dimension").forEach(dd => {
                  console.log("Dimension name: " + dd.attributes.name.nodeValue);
                  // Elevation
                  if (dd.attributes.name.nodeValue == "elevation"){
                    // Get elevation values
                    let tmpStr = dd.innerHTML.replace('\n', '[');
                    let elevationArray = JSON.parse(tmpStr + ']');
                    dataType.elevation = elevationArray;
                  // Time dimension
                  } else if (dd.attributes.name.nodeValue == "time"){
                    // Parse time (will depend on month, day)
                    if(currTimeScale == "h"){
                      let tmpStr = dd.innerHTML.replace('\n', '');
                      // Get the minutes (innerHTML example: '\n   2021-03-29T00:30:00.000Z/2022-02-28T23:30:00.000Z/PT1H')
                      let minutes = dd.innerHTML.substring(dd.innerHTML.indexOf('T') + 4, dd.innerHTML.indexOf('T') + 6);
                      dataType.timeScaleCorrection.h = {'min': parseInt(minutes)};
                    } else if (currTimeScale == "d") {
                      let minutes = dd.innerHTML.substring(dd.innerHTML.indexOf('T') + 4, dd.innerHTML.indexOf('T') + 6);
                      let hours = dd.innerHTML.substring(dd.innerHTML.indexOf('T') + 1, dd.innerHTML.indexOf('T') + 3);
                      dataType.timeScaleCorrection.d = { 'min': parseInt(minutes), 'h': parseInt(hours) };
                    } else if (currTimeScale == "m"){
                      // Store all months available
                      let mTimeDesc = dd.innerHTML.replace(/[\n ]/g, '').split(',');
                      // Can be
                      // 2019-05-16T12:00:00.000Z/2019-07-16T12:00:00.000Z/P30DT12H
                      // 2020-02-15T12:00:00.000Z
                      let dates = [];
                      mTimeDesc.forEach(tDesc => {
                        if (tDesc.includes('/')){ // Time interval
                          let tInt = tDesc.split('/'); // Time intervals
                          let startT = new Date(tInt[0]);
                          let endT = new Date(tInt[1]);
                          while (startT <= endT){
                            dates.push(startT.toISOString());
                            startT.setMonth(startT.getMonth() + 1);
                          }
                        } else { // Specific time
                          dates.push(tDesc);
                        }
                      });
                      dataType.timeScaleCorrection.m = {'dates': dates};
                    }
                    
                  } else
                    console.log("Unknown dimension" + dd.attributes.name.nodeValue);
                });


              }
            })
            
          })
          .catch(console.error);
      } else {
        console.log("Skipping " + dataType.url + " in " + timeScales[i]);
      }
      
    } // End of timeScales loop
    
  }

})