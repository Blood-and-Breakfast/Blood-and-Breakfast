Meteor.startup(function() {
   theMap = GoogleMaps.load();

 });

Meteor.subscribe('stops');
// Meteor.subscribe('markers');
Meteor.subscribe('routes');
Meteor.subscribe('players');
Meteor.subscribe('buses');


Template.map.rendered = function() {
  if (! Session.get('map')) {
    gmaps.initialize();
  }

   Session.set('fakePosition', {lat:37.7577, lon:-122.4376});
   //creates a draggable marker
    var draggableMarker = new google.maps.Marker({
      draggable: true,
      position: new google.maps.LatLng(37.7577,-122.4376),
      map: gmaps.map,
      title: "Your fake location",
     // icon: //can change depending on team 
    });
    
    //gets the draggable marker's position when done dragging
    google.maps.event.addListener(draggableMarker, 'dragend', function (event) {
      var playerLat = this.getPosition().lat();
      var playerLng = this.getPosition().lng();
      console.log("The draggableMarker's position is: ", playerLat, playerLng);
      //stores the marker's position in a session AVAILAIBLE FOR USE EVERYWHERE
      Session.set('fakePosition', {lat: playerLat, lon: playerLng});
    });

  Deps.autorun(function() {
    console.log("AutoRun has STARTED ==========================");
    gmaps.deleteCurrentMarkers();
    //get bus stops near the draggable marker
    var findLocalStops = function(){
      var fakePosition = Session.get('fakePosition');
      var latGT = parseFloat(fakePosition.lat) - 0.005;
      var latLT = parseFloat(fakePosition.lat) + 0.005;
      var lonGT = parseFloat(fakePosition.lon) - 0.005;
      var lonLT = parseFloat(fakePosition.lon) + 0.005;
      return Stops.find({'lat': {$gt: latGT, $lt: latLT}, 'lon': {$gt: lonGT, $lt: lonLT}}).fetch();
    };
    var stops = findLocalStops();
    //create a marker for each stop
    _.each(stops, function(stop) {
      if (typeof stop.lat !== 'undefined' &&
        typeof stop.lon !== 'undefined') {

          var objMarker = {
            id: stop._id,
            lat: stop.lat,
            lng: stop.lon,
            title: stop.title,
            vampires: stop.vampires,
            zombies: stop.zombies
          };
            // check if marker already exists
          if (!gmaps.markerExists('id', objMarker.id))
            gmaps.addMarker(objMarker)
          }
    });
  });
}
 
Template.map.destroyed = function() {
    Session.set('map', false);
}