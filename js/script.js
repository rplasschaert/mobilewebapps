/**
 * Created by Robert on 27-4-2017.
 */
var lastAnimalClicked = "";
var image = "";
var map = "";
var loaded = false;
var region = "";

(function() {
    $('#previous').on('click', function(){
        window.history.back();
    });
    $('.animal').on('click', function(){
        lastAnimalClicked = $(this).attr('id');
        console.log('lastAnimalClicked: ' + lastAnimalClicked);
    });
    $('#location').on('click', curLocation);
    $('.region').on('click', function(event){
        region = event.currentTarget.id;

        loadPage()
    })
})();

function curLocation(){

    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(13);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function loadPage(){

}
function placeAnimal(latLng, map){
    switch(lastAnimalClicked){
        case "lion":
            image = "media/lion-icon.png";
            break;
        case "elephant":
            image = "media/elephant-icon.png";
            break;
        case "rhino":
            image = "media/rhino-icon.png";
            break;
        case "leopard":
            image = "media/leopard-icon.png";
            break;
    }


    if(lastAnimalClicked != ""){
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image
        });
        if(loaded){
            saveMarker(lastAnimalClicked, latLng);
        }
    }



    lastAnimalClicked = "";

}
var initMap = (function(){
    var uluru = {};
    switch(document.title){
        case "Far North":
            uluru = {lat: -22.681880, lng: 31.170197};
            break;
        case "northern":
            uluru = {lat: -23.491354, lng: 31.396213};
            break;
        case "central":
            uluru = {lat: -24.219902, lng: 31.614347};
            break;
        case "southern":
            uluru = {lat: -25.062179, lng: 31.649523};
            break;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: uluru,
        disableDefaultUI: true
    });

    map.addListener('click', function (e) {
        placeAnimal(e.latLng, map)
    })
})();
var loadIcons = (function() {
    if(!window.title){
        $.getJSON("http://localhost:3000/animalsToday", function (data) {
            for (var i = 0; i < data.length; i++) {
                lastAnimalClicked = data[i].type;
                placeAnimal(data[i].uluru, map)
            }
            loaded = true;
        });
    }
}());
var saveMarker = function(type, latlng){
    var animal ={
        "type": type,
        "uluru": latlng
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/animalsToday',
        data: JSON.stringify(animal),
        success: function (data) {
        },
        error: function (ex) {
            console.log(ex.status);
        },
        contentType: "application/json; charset=utf-8",
        dataType: 'json'
    });
};