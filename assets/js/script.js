/**
 * Created by Robert on 27-4-2017.
 */
var lastAnimalClicked = "";
var image = "";


(function() {
    $('#previous').click(function(){
        window.history.back();
    });
    $('.animal').on('click', function(){
        lastAnimalClicked = $(this).attr('id');
        console.log('lastAnimalClicked: ' + lastAnimalClicked);
    })
})();


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
