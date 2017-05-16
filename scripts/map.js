
(function(){

        var mapContainer = document.querySelectorAll("[data-map-container]");

        if (mapContainer.length==0 ){
            return;
        }
   
        var runMap = function (i){
            console.log(i);
            var mapc = mapContainer[i].querySelector("[data-map]");
            var mapClose = mapContainer[i].querySelector("[data-map-close]");
            var body = document.body;
            
            mapContainer[i].style.visibility = 'visible';
            window.scrollTo(0,0);
            body.style.overflow = 'hidden';
            
            var myCenter = new google.maps.LatLng(mapc.dataset.mapLat,mapc.dataset.mapLng);
            var mapOptions = {center: myCenter, zoom: 15};
            var map = new google.maps.Map(mapc, mapOptions);
            var marker = new google.maps.Marker({position:myCenter});
            marker.setMap(map);

            var closeMap = function (){
                console.log("Closing");
                mapContainer[i].style.visibility = 'hidden';
                body.style.overflow = 'visible';

            }

            mapClose.addEventListener("click", closeMap);

        }
        
        window.addEventListener("load", function(){

            var mapImg = document.querySelectorAll("[data-map-img]");
            console.log("no. of maps : " + mapImg.length);
            for (var k=0; k<mapImg.length; k++){
                
                (function(k){

                console.log(k);                    
                mapImg[k].addEventListener("click", function(){
                    runMap(k);
                });   

                })(k);
            }
        });
})();