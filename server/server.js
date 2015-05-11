var RSVP = Meteor.npmRequire('rsvp');
var Firebase = Meteor.npmRequire('firebase');
var GeoFire = Meteor.npmRequire('geofire');

Meteor.publish('stops', function() {
  return Stops.find();
});

// Meteor.publish('markers', function() {
//   return Markers.find();
// });

Meteor.publish('routes', function() {
  return Routes.find();
});

// Meteor.publish('buses', function() {
//   return Buses.find();
// });


  Meteor.publish("players", function () {
    return Players.find();
  });


  Meteor.publish("buses", function () {
    return Buses.find();
  });

  Meteor.methods({
    setUserName: function(name){
      //check if user already has a team
      //if they do exit and return error
      return name;
    }
  });

Meteor.startup(function () {
  // code to run on server at startup


  //function is used in _.each statement to get stops while getting routes
  var getStops = function (tag) {
    HTTP.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r='+tag, function (err, res) {
      if (err) {
        console.log("Error getting stops for route: ", err);
      }

      xml2js.parseString(res.content, function (err, parsedJson) {
        if (err) {
          console.log("Error getting stops for Route "+ tag);
        }
        var stops = parsedJson.body.route[0].stop;
        _.each(stops, function (obj) {
          Stops.upsert({stopId: obj.$.stopId}, {
            tag: obj.$.tag,
            title: obj.$.title,
            lat: parseFloat(obj.$.lat),
            lon: parseFloat(obj.$.lon),
            stopId: obj.$.stopId
          });
        });
      });
    });
  };
  //fetches all routes from NextBus and stores them to MongoDB Routes
  HTTP.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni', function (err, res) {
    //converts XML from NextBus API to JSON
    if (err) {
                console.log("Error getting all Routes: ", err);
              }
    xml2js.parseString(res.content, function (err, parsedJson){
      var routes = parsedJson.body.route;
      _.each(routes, function (obj) {
        Routes.upsert({tag: obj.$.tag, title: obj.$.title }, {
          tag: obj.$.tag,
          title: obj.$.title
        });
        // gets all stops for each Route and stores them to MongoDB Stops
        getStops(obj.$.tag);
      });
    });
  });
});

// var queryBuses = function(){
/* temporary suppression of bus data fetching from firebase
var firebaseRef = new Firebase('https://publicdata-transit.firebaseio.com/');
var geoFire = new GeoFire(firebaseRef.child("_geofire"));
// limit query radius for now
var radiusInKm = 0.5;
// center initial query on firebase HQ
var center = [37.785326, -122.405696];
var vehiclesInQuery = {};
// Create a new GeoQuery instance
var geoQuery = geoFire.query({
  center: center,
  radius: radiusInKm
});
geoQuery.on("key_entered", Meteor.bindEnvironment(function(vehicleId, vehicleLocation) {
  // Specify that the vehicle has entered this query
  vehicleId = vehicleId.split(":")[1];
  vehiclesInQuery[vehicleId] = true;
  // Look up the vehicle's data in the Transit Open Data Set
  firebaseRef.child("sf-muni/vehicles").child(vehicleId).once("value", Meteor.bindEnvironment(function(dataSnapshot) {
    // Get the vehicle data from the Open Data Set
    vehicle = dataSnapshot.val();
    console.log(vehicle);
    Buses.insert({
      lat:   vehicle.lat,
      lon:   vehicle.lon,
      route: vehicle.routeTag
    });
  }));
}));
*/

  /*  // swapping restbus.info for firebase
  HTTP.get('http://restbus.info/api/agencies/sf-muni/vehicles', function(error, results){
    if (!error){
      Buses.remove({});
      JSON.parse(results.content).forEach( function(element){
        Buses.insert({lat: element.lat, lon: element.lon});
        console.log(element.lat);
      });
    } else {
      console.log(error);
    }
  });
  */

