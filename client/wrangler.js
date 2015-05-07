gmaps = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],
 
    // add a marker given our formatted marker data object
    addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title,
            // animation: google.maps.Animation.DROP,
            icon: gmaps.chooseMarker(stop)
        });
        this.latLngs.push(gLatLng);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        return gMarker;
    },

    deleteCurrentMarkers: function () {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    
    //makes individual bus markers red or green based on who controls that bus stop, blue if safe or equal
    chooseMarker: function (stop) {
      var stopUrl;
      if (!stop.zombie && !stop.vampire || stop.vampire === stop.zombie) {
        stopUrl = './safe-bus-stop.png';
      } else if (stop.zombie && stop.vampire) {
        stopUrl = (stop.vampire > stop.zombie) ? './vampire-bus-stop.png' : './zombie-bus-stop.png';
      } else if (stop.zombie || stop.vampire) {
        stopUrl = stop.zombie ? './zombie-bus-stop.png' : './vampire-bus-stop.png';
      }
      return stopUrl;
    },
 
    // calculate and move the bound box based on our markers CURRENTLY NOT USED
    calcBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },
 
    // check if a marker already exists
    markerExists: function(key, val) {
        _.each(this.markers, function(storedMarker) {
            if (storedMarker[key] == val)
                return true;
        });
        return false;
    },
 
    // intialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var stylesArray =
          [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [
                { "visibility": "on" },
                { "hue": "#0000ff" },
                { "weight": 0.5 },
                { "gamma": 0.31 },
                { "saturation": 100 },
                { "lightness": -7 }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                { "visibility": "on" },
                { "hue": "#0000ff" },
                { "weight": 0.75 },
                { "gamma": 0.31 },
                { "saturation": 100 },
                { "lightness": -7 }
              ]
            },
            {
              featureType: 'all',
              elementType: 'labels',
               "stylers": [
                { "visibility": "off" },
                { "hue": "#000000" },
                { "weight": 0.75 },
                { "gamma": 0.31 },
                { "saturation": 100 },
                { "lightness": -7 }
              ]
            }
          ];
        var setMapStyleToTeam = function(){

          var hue = "#ff0000";
          if(Session.get("isZombie")){
            hue = "#00ff00";
          }

          stylesArray[0].stylers[1].hue = hue;
          stylesArray[1].stylers[1].hue = hue;
          stylesArray[2].stylers[1].hue = hue;
          if(theMap){
            theMap.setOptions({styles: stylesArray});
          }
        };
        setMapStyleToTeam();
        var mapOptions = {
          center: new google.maps.LatLng(37.7577, -122.4376), //approx. center of SF
          zoom: 15,
          styles: stylesArray,
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
          //draggableCursor: "path",
          minZoom: 12,
          //maxZoom: 12,
          //noClear: true,
          overviewMapControl: false,
          mapTypeControlOptions: {}
        };
 
        this.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
        );
 
        // global flag saying we intialized already
        Session.set('map', true);
    }
}