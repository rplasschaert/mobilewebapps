/**
 * Created by Robert on 27-4-2017.
 */

(function() {
    $('#previous').click(function(){
        window.history.back();
    });
})();

function placeLion(latLng, map){
    var image = "assets/media/lion.png";
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: image
    });

}