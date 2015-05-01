


if (Meteor.isClient) {

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(37.7577,-122.4376), //approx. center of SF
        zoom: 12
      };
    }
  }
});

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {

    //Markers.insert({ lat: 37.92745749, lng: -122.30918959999998, animation: google.maps.Animation.BOUNCE, icon: }); //this is a test line of code with which you can explore marker options

    // the code below automatically detects changes in the Markers mongo collection and updates the map accordingly.  property values from
    // the collection can be referred to so that look and behavior can be customized based on properties of the data point

    var markers = {};

    Markers.find().observe({
      added: function(document) {
        // Create a marker for this document
        var marker = new google.maps.Marker({
          // a plethora of key value pair options can be found at the google maps api website with which markers can be customized ad nauseum
          animation: document.animation || google.maps.Animation.DROP,
          icon: document.icon, //<- we can use this option when we want to customize our icons
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          id: document._id
        });

        // Store this marker instance within the markers object.
        markers[document._id] = marker;
      },
      changed: function(newDocument, oldDocument) {
        markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
      },
      removed: function(oldDocument) {
        // Remove the marker from the map
        markers[oldDocument._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
          markers[oldDocument._id]);

        // Remove the reference to this marker instance
        delete markers[oldDocument._id];
      }
    });
  });
});
}
