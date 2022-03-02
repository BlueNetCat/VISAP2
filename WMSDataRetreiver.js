// Scripts that obtain data from the CMEMS WMS API


// CMEMS base url
const domainURL = 'https://my.cmems-du.eu/thredds/wms/';//"https://nrt.cmems-du.eu/thredds/wms/";

// Variables:
var dataTypes = {
  "Sea surface velocity": {
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-cur-rean-d?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&LAYERS=sea_water_velocity&STYLES=boxfill/ncview&LOGSCALE=false&SRS=EPSG:4326&BBOX=0,22.5,22.5,45&WIDTH=512&HEIGHT=512&COLORSCALERANGE=0.008134,0.3748&BELOWMINCOLOR=0x0000ff&ABOVEMAXCOLOR=0xff0001&TIME=2005-03-25T12:00:00.000Z&ELEVATION=-1.0182366371154785
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-cur-rean-d?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-cur-rean-m?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    name: 'Sea surface velocity',
    url: 'med-cmcc-cur-rean', // Forecast 'med-cmcc-cur-an-fc',
    layerName: 'sea_water_velocity', 
    timeScales: ['d', 'd3', 'm'], // In reanalysis, no hourly; 'h', 'h3', 'h6', 'h12', 
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
    // Reanalysis comes from a different base URL. Only monthly and daily
    // 'https://my.cmems-du.eu/thredds/wms/med-cmcc-tem-rean-m?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-tem-rean-d?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    name: 'Sea temperature',
    url: 'med-cmcc-tem-rean', // Forecast: 'med-cmcc-tem-an-fc',
    layerName: 'thetao',
    timeScales: ['d', 'd3', 'm'], // In reanalysis, not hourly available: 'h', 'h3', 'h6', 'h12', 
    range: [10, 32],
    units: 'ºC',
    style: "boxfill%2Foccam",
  },
  "Salinity": {
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-sal-rean-m?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    // https://my.cmems-du.eu/thredds/wms/med-cmcc-sal-rean-d?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    name: 'Salinity',
    url: 'med-cmcc-sal-rean',// Forecast 'med-cmcc-sal-an-fc', 
    layerName: 'so',
    timeScales: ['d', 'd3', 'm'], // In reanalysis, only daily and monthly; 'h', 'h3', 'h6', 'h12', 
    range: [32, 41],
    units: '‰',
    style: "boxfill%2Foccam",
  },
  "Wave significant height": {
    // https://my.cmems-du.eu/thredds/wms/med-hcmr-wav-rean-h?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    // https://my.cmems-du.eu/thredds/wms/med-hcmr-wav-rean-h?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&LAYERS=VHM0&STYLES=boxfill/ncview&LOGSCALE=false&SRS=EPSG:4326&BBOX=-22.5,22.5,0,45&WIDTH=512&HEIGHT=512&COLORSCALERANGE=0,10&BELOWMINCOLOR=0x0000ff&ABOVEMAXCOLOR=0xff0001&TIME=2007-02-20T22:00:00.000Z
    name: 'Wave significant height',
    url: 'med-hcmr-wav-rean',// Forecast 'med-hcmr-wav-an-fc',
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
    url: 'med-hcmr-wav-rean',// Forecast 'med-hcmr-wav-an-fc',
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
    url: 'med-hcmr-wav-rean',// Forecast 'med-hcmr-wav-an-fc',
    layerName: 'VTM10', // Check out other period measures
    timeScales: ['h', 'h3', 'h6', 'h12'],
    range: [0, 18],
    units: 's',
    style: "boxfill/sst_36", //occam_pastel-30",
  },
  'Chlorophyll': {
    // https://my.cmems-du.eu/thredds/wms/med-ogs-pft-rean-d?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    // https://my.cmems-du.eu/thredds/wms/med-ogs-pft-rean-m?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
    name: 'Chlorophyll',
    url: 'med-ogs-pft-rean',// Forecast: 'med-ogs-pft-an-fc',
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
// Loading control
let loading = 0;
let loaded = 0;

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
        loading++;
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
                // Iterate through Dimensions (elevation, time)
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
                      let mTimeDesc = dd.innerHTML.replace(/[\n ]/g, '').split(','); // Remove [] and ' ', and split by time periods
                      // Can be
                      // 2019-05-16T12:00:00.000Z/2019-07-16T12:00:00.000Z/P30DT12H
                      // 2020-02-15T12:00:00.000Z
                      // Iterate time periods
                      let dates = [];
                      mTimeDesc.forEach(tDesc => {
                        if (tDesc.includes('/')) { // Time interval, e.g., 2019-05-16T12:00:00.000Z/2019-07-16T12:00:00.000Z/P30DT12H
                          let tInt = tDesc.split('/'); // Time intervals
                          let startT = new Date(tInt[0]);
                          let endT = new Date(tInt[1]);
                          while (startT <= endT){
                            dates.push(startT.toISOString());
                            startT.setMonth(startT.getMonth() + 1);
                          }
                        } else { // Specific time, e.g., 2020-02-15T12:00:00.000Z
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
            loaded++;
            if (loading == loaded){
              console.log('All loaded!');
              getDataAtPoint();
            }
          })
          .catch(console.error);
          // End of fetch
      } else {
        console.log("Skipping " + dataType.url + " in " + timeScales[i]);
      }
      
    } // End of timeScales loop
    
  } // End of oceanProduct
  

}) // End of data types loop
console.log(dataTypes);



// Get data at a specific point
const getDataAtPoint = function(){
  // Input variables
  var dataName = "Sea temperature";
  var lat = 41;
  var long = 2.9;
  var date = '2010-01-12T12:00:00.000Z';
  var timeScale = 'd';

  // Find data type with that name
  let dataType = undefined;
  Object.keys(dataTypes).forEach(dKey => { if (dKey == dataName) dataType = dataTypes[dKey] });

  // https://my.cmems-du.eu/thredds/wms/med-cmcc-cur-rean-d?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png
  // &TRANSPARENT=TRUE
  // &LAYERS=sea_water_velocity
  // &STYLES=boxfill/ncview
  // &LOGSCALE=false
  // &SRS=EPSG:4326
  // &BBOX=0,22.5,22.5,45
  // &WIDTH=512
  // &HEIGHT=512
  // &COLORSCALERANGE=0.008134,0.3748
  // &BELOWMINCOLOR=0x0000ff
  // &ABOVEMAXCOLOR=0xff0001
  // &TIME=2005-03-25T12:00:00.000Z
  // &ELEVATION=-1.0182366371154785

  var params = {
    'LAYERS': dataType.layerName,
    'COLORSCALERANGE': String(dataType.range),
    'BBOX': String(long - 0.2) + "," + String(lat - 0.2) + "," + String(long + 0.2) + "," + String(lat + 0.2),
    'STYLES': 'boxfill/greyscale', // TODO: check that the gradient from black to white is linear
    // Other default parameters
    'SRS': 'EPSG:4326',
    'TILED': 'true',
    'LOGSCALE': 'false',
    'TRANSPARENT': 'true',
    'WIDTH': 1,
    'HEIGHT': 1,
  }
  // Add elevation
  if (dataType.elevation !== undefined)
    params['ELEVATION'] = String(dataType.elevation[0]);

  // Add time parameter
  // SHOULD BE DEPENDANT ON SELECTED TIME SCALE (for now daily? - wave does not have daily, only hourly
  params['TIME'] = date;
  // Construct WMS url
  let version = '1.1.1'; // 1.3.0 (then CRS should be instead of SRS)
  let url = domainURL + dataType.url + '-' + dataType.timeScales[0] + '?SERVICE=WMS&VERSION='+ version +'&REQUEST=GetMap&FORMAT=image/png';

  Object.keys(params).forEach(ppKey => {
    url += '&' + ppKey + '=' + params[ppKey];
  });
  console.log('HELLOO');
  console.log(url);

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    // Get the normalized value from pixel
    let value = getValueFromImage(img);
    // Put in range of the data type
    value = value * (dataType.range[1] - dataType.range[0]) + dataType.range[0];
    console.log(value)
    // Improve precision // TODO: change the colorscalerange to be closer to the value
    debugger;
    url = SourceWMS.setWMSParameter(url, 'COLORSCALERANGE', [value-2, value+2]);
    let imgPrec = new Image();
    imgPrec.crossOrigin = "Anonymous";
    imgPrec.src = url;
    imgPrec.onload = () => {
      let vPrec = getValueFromImage(imgPrec);
      vPrec = vPrec * (4) + value-2;
      console.log(vPrec);
    }
  };
  img.src = url;
}


getValueFromImage = function(img){
  let canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  let pixels = ctx.getImageData(0, 0, 1, 1);
  let pixel = pixels.data[0];
  return pixel/255;
}