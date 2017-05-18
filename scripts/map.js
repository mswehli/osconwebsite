(function(){

        window.addEventListener("load", function(){

            var mapc = document.querySelector("[data-map]");

            if (mapc==null ){
               return;
            }
             
            var myCenter = new google.maps.LatLng(mapc.dataset.mapLat,mapc.dataset.mapLng);
            var mapOptions = {center: myCenter, zoom: 18};
            var map = new google.maps.Map(mapc, mapOptions);
            var marker = new google.maps.Marker({position:myCenter});
            marker.setMap(map);
            
        });
})();