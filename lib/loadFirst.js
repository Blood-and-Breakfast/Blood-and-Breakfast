if (Meteor.isServer) {
  var RSVP = Meteor.npmRequire('rsvp');
  var Firebase = Meteor.npmRequire('firebase');
  var GeoFire = Meteor.npmRequire('geofire');  
}
Buses = new Mongo.Collection("buses");
// var apiMarkerToRemove = Buses.find({apiMarker: true}).fetch();
// if (apiMarkerToRemove[0]){
// 	Buses.remove({_id: Buses.find({apiMarker: true}).fetch()[0]._id});
// }
Buses.insert({apiMarker: true, apiStatus: false});