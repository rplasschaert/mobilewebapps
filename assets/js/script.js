/**
 * Created by Robert on 27-4-2017.
 */
var lastAnimalClicked = "";
var image = "";


(function() {
    $('#previous').on('click', function(){
        window.history.back();
    });
    $('.animal').on('click', function(){
        lastAnimalClicked = $(this).attr('id');
        console.log('lastAnimalClicked: ' + lastAnimalClicked);
    });
    $('#location').on('click', curLocation)
})();


function curLocation(){
    console.log('asdsad');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function placeAnimal(latLng, map){
    switch(lastAnimalClicked){
        case "lion":
            image = "assets/media/lion-icon.png";
            break;
        case "elephant":
            image = "assets/media/elephant-icon.png";
            break;
        case "rhino":
            image = "assets/media/rhino-icon.png";
            break;
        case "leopard":
            image = "assets/media/leopard-icon.png";
            break;
    }


    if(lastAnimalClicked != ""){
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image
        });
        lastAnimalClicked = "";
    }




}
