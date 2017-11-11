      // In the following example, markers appear when the user clicks on the map.
           // Each marker is labeled with a single alphabetical character.
           var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
           var labelIndex = 0;

           function initialize() {
               var bangalore = { lat: 12.97, lng: 77.59 };
               var loc;
               var map = new google.maps.Map(document.getElementById('map'), {
                   zoom: 12,
                   center: bangalore
               });

               // This event listener calls addMarker() when the map is clicked.
               google.maps.event.addListener(map, 'click', function (event) {
                   addMarker(event.latLng, map);     
                   loc = event.latLng;
               });

               // Add a marker at the center of the map.
               addMarker(bangalore, map);
           }

           // Adds a marker to the map.
           function addMarker(location, map) {
               // Add the marker at the clicked location, and add the next-available label
               // from the array of alphabetical characters.
               var marker = new google.maps.Marker({
                   position: location,
                   label: labels[labelIndex++ % labels.length],
                   map: map
               });
           
               var infowindow = new google.maps.InfoWindow({
                   content: '<h3>' + marker.position + ' </h3>'
        
               });

               marker.addListener('click', function () {
                   infowindow.open(map, marker);
                   console.log(marker.position.lat());
                   console.log(typeof (marker.position.lat()));
               });
            
           }

           google.maps.event.addDomListener(window, 'load', initialize);