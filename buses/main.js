                    // SETTING THE MAP

let map = L.map('theMap').setView([44.650627, -63.597140], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

                    // SETTING THE LAYER, RENDERING BUSES WITH THE INTERVALS, ROTATION
                    
let layerGroup = L.layerGroup().addTo(map);
                    
                    
let CoordinatesObj = {};

    function getBusLocation()
    {

        layerGroup.clearLayers();

        fetch('https://hrmbuses.azurewebsites.net')
        .then(res=>res.json()) 
        .then(jsobj=>{
        
            const busDataArr = jsobj.entity.filter((x)=>x.vehicle.trip.routeId <= "10");
  
            busDataArr.map(x=>
            {
                    if(CoordinatesObj[x.vehicle.trip.routeId <= "10"])
                {
                    CoordinatesObj[x.vehicle.trip.routeId].setLatLng([x.vehicle.position.latitude, x.vehicle.position.longitude]);
                }
                else
                {
                    CoordinatesObj[x.vehicle.trip.routeId] = L.marker([x.vehicle.position.latitude, x.vehicle.position.longitude], {icon: busIcon}, {rotationAngle: 45}).addTo(layerGroup).bindPopup("<b>I am a happy bus!</b><br>I'm on my way - Hold on!").openPopup();;
                    CoordinatesObj[x.vehicle.trip.routeId].setRotationAngle(x.vehicle.position.bearing);
                }
            });
                
        });
    };

setInterval(getBusLocation,9000);


                                    // BUS ICON
let busIcon = L.icon(
    {
    iconUrl: 'bus.png',

    iconSize:     [50, 55],
    iconAnchor:   [22, 94],
    popupAnchor:  [-3, -76]
    });
                                    //POPUPS

    let popup = L.popup()
    .setLatLng([44.66966541403556, -63.613695318667254])
    .setContent("<b>FULL-STACK ROCKS HERE</b>.")
    .addTo(map);



