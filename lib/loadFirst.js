if (Meteor.isServer) {
  var RSVP = Meteor.npmRequire('rsvp');
  var Firebase = Meteor.npmRequire('firebase');
  var GeoFire = Meteor.npmRequire('geofire');  
}
Buses = new Mongo.Collection("buses");

Buses.insert({apiMarker: true, apiStatus: false});