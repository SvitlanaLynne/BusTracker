                    //SETTING THE MAP

let map = L.map('theMap').setView([44.650627, -63.597140], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




                    //SETTING THE LAYER, GETTING THE DATA REPEATEDLY

let layerGroup = L.layerGroup().addTo(map);

    function getBusLocation()
    {
        
        fetch('https://hrmbuses.azurewebsites.net')
        .then(res=>res.json()) 
        .then(jsobj=>{
            
            const busDataArr = jsobj.entity.filter((x)=>x.vehicle.trip.routeId <= '10');  

                    //GEOJSON ON THE LAYER
            
            function GeoJSONRender()
            {   
                layerGroup.clearLayers();
                
                let JSONArr = [];
                for (let elem of jsobj.entity){
                    
                    if (elem.vehicle.trip.routeId <= '10')
                    {
                        let lat = elem.vehicle.position.latitude;
                        let long = elem.vehicle.position.longitude;
                        let routeId = elem.vehicle.trip.routeId;
                        
 
                        JSONArr.push(generateGeoFromLatLong(lat,long,routeId)); 
                    }
                };
                
                geoLayer = L.geoJSON (JSONArr);
                geoLayer.addTo(layerGroup);
            };
            
            GeoJSONRender();
            
        });
    };

setInterval(getBusLocation,9500);

        
        
                    //CONVERTING DATA INTO GEOJSON FORMAT

    function generateGeoFromLatLong (lat, long, routeId)
    {
        return geoObj =
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [long, lat]
            },
            "properties": {
                "routeId": routeId
            }
        }
    };
        





    



    
    
    
