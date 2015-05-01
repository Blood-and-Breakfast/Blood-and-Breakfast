//Markers.insert({ lat: 37.92745749, lng: -122.30918959999998, animation: google.maps.Animation.BOUNCE, icon: }); //this is a test line of code with which you can explore marker options


if (Meteor.isClient) {

  Meteor.startup(function() {
    addBusStops();
  });

  Meteor.subscribe('stops');
  Meteor.subscribe('markers');


  addBusStops = function(){
    var busStops = Stops.find().fetch();
    var stop;
    Markers.insert({ lat: 37.92745749, lng: -122.30918959999998, icon: "./blue-bus-stop.png" }); //this is a test line of code with which you can explore marker options
    var count = 0;
    for(var i = 0; i < busStops.length; i++){

      console.log("Stop Count", count++);
      stop = busStops[i];
      Markers.insert({ lat: stop.lat, lng: stop.lon, icon: "./blue-bus-stop.png" });
    }
  };

  infectArea = function(teamName){
    var loc = playerLoc;
    var team = teamName;
    var id = Meteor._id;

  };

  Template.registerHelper("playerLoc", function(){
    return playerLoc();
  });

  playerLoc = function(asVals){
    var loc = Geolocation.currentLocation();
    if(!loc) return "";
    var locX = loc.coords.latitude;
    var locY = loc.coords.longitude;
    if(asVals){
      return {lon: locX, lat: locY};
    }

    return "" + locX + "," + locY;
  }

}
