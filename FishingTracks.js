// Functions that help with the management of bottom trawl fishing

class TrackLines {

    // Variables
    selStartDate = new Date();
    selEndDate = new Date();
    limStartDate = new Date();
    limEndDate = new Date();
    geoJSONData = {
        'type': 'FeatureCollection',
        'features': []
    };
    trackLinesLayer = undefined;



    constructor(address, staticFile, onLoadTracks){

        // Callback function for when the tracks are loaded
        this.onLoadTracks = onLoadTracks;

        // Get track lines from server or from file
        // If gotten, create track lines geojson and vector layer
        this.getTrackLines(address, staticFile);
    }



    // Get track lines information
    // Load and create pie chart
    getTrackLines(address, staticFile){
        console.log("Getting data: " + address + ", " + staticFile + ", ");
        // Try data from server
        fetch(address)
            .then(r => r.json())
            .then(r => {
                createTrackLines(r);
            })
            .catch(e => {
                if (staticFile !== undefined) { // Load static file
                    console.error("Could not fetch from " + address + ". Error: " + e + ". Trying with static file.");
                    window.serverConnection = false;
                    getTrackLines(staticFile, undefined);
                } else {
                    console.error("Could not fetch from " + address + ". Error: " + e + ".");
                }
            })
    }



    // Create trackLines GEOJSON object and create openlayers layer
    createTrackLines(data){

        // Create geojson
        let startDate = '2020-1-1';
        let endDate = '2020-12-31';
        for (let i = 0; i < data.length; i++) {
            //https://github.com/cschwarz/wkx
            //Parsing a node Buffer containing a WKB object
            if (data[i].geom === null)
                continue;

            // Find start and end dates for time slider and selecting tracks
            // Only data until end of 2020
            if (data[i].Data.split('-')[0] > "2020")
                continue;
            // Find earliest date
            if (startDate.split('-')[0] >= data[i].Data.split('-')[0]) {
                if (startDate.split('-')[1] >= data[i].Data.split('-')[1]) {
                    if (startDate.split('-')[2] > data[i].Data.split('-')[2]) {
                        startDate = data[i].Data;
                    }
                }
            }

            // Read geometry
            let wkbBuffer = new Buffer(data[i].geom, 'hex');
            let geometry = wkx.Geometry.parse(wkbBuffer);
            let gJSON = geometry.toGeoJSON();
            delete data[i].geom; // delete geom, as we do not want it in the features
            // Create geoJSON
            let feature = {
                'type': 'Feature',
                'properties': {
                    "id": data[i].Id,
                    "info": data[i],
                    "featType": "trackLine",
                },
                'geometry': gJSON,
            }

            this.geoJSONData.features.push(feature);
        }
        //console.log(JSON.stringify(geoJSONData)); // To write static file


        // Store starting and ending dates of tracks
        // Remove 1 to month! https://www.w3schools.com/js/js_dates.asp
        let sDate = startDate.split('-');
        let eDate = endDate.split('-');
        sDate[1] -= 1;
        eDate[1] -= 1;

        this.limStartDate = new Date(...sDate);
        this.limEndDate = new Date(...eDate);

        //var timeSlider = new TimeSliderArcGIS("trackLinesTimeslider", new Date(...sDate), new Date(...eDate), undefined);
        //timeSlider.createTimeSlider();



        // Create OL Layer
        // Create URL
        let dataStr = JSON.stringify(this.geoJSONData);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        // Create layer
        //let vectorTrackLines = new ol.layer.Vector({
        this.trackLinesLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                //features: new ol.format.GeoJSON().readFeatures(geoJSONData), // This is not working??? https://openlayers.org/en/latest/examples/geojson.html
                url: dataUri,//'data/trackLines.geojson',
                format: new ol.format.GeoJSON(),
            }),
            //style: mapStyles.trackLineStyle,
        });


        // Add layer to map?
        this.onLoadTracks();
        //map.addLayer(vectorTrackLines);
    }


    // Returns the openlayers layer
    getLayer() {
        return this.trackLinesLayer;
    }

    
    



}