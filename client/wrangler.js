//no need to wrap everything in if (Meteor.isClient) {} since file is in the client folder

  Meteor.startup(function() {

  });

  Meteor.subscribe('stops');
  Meteor.subscribe('markers');
  Meteor.subscribe('routes');
  Meteor.subscribe('players');

  //pulls all stops out of db and adds markers for them
  //likely only needs to be called once ever
  //and from there on out just pulls from markers
  var addBusStops = function(geolocation){
    var latGT = parseFloat(geolocation.lat) + 0.005;
    var latLT = parseFloat(geolocation.lat) - 0.005;
    var lonGT = parseFloat(geolocation.lon) + 0.005;
    var lonLT = parseFloat(geolocation.lon) - 0.005;
    //query for bus stops based on user location
    //var busStops = Stops.find({'lat': {$gt: latGT, $lt: latLT}, 'lon': {$gt: lonGT, $lt: lonLT}}).fetch();
    
    //finds all bustops and add them to Markers collection
    var busStops = Stops.find({}).fetch();
    var stop;
    //Markers.insert({ lat: 37.7833, lng: -122.4167, icon: "./blue-bus-stop.png" }); //this is a test line of code with which you can explore marker options
    var count = 0;
    for(var i = 0; i < busStops.length; i++){
      //console.log("Stop Count", count++);
      stop = busStops[i];
      Markers.insert({ lat: stop.lat, lng: stop.lon, icon: "./blue-bus-stop.png" });
    }
  };


  //TODO: make this do something
  //query db for all stops and buses within n distance of player
  //set bite button timer on client and server
  //disable bit button until timer resets
  var infectArea = function(teamName){
    var loc = playerLoc;
    var team = teamName;
    var id = Meteor._id;

  };

  Template.registerHelper("playerLoc", function(){
    return playerLoc();
  });

  //passing true will return an object with floats
  //not passing true will return a string of coords
  var playerLoc = function(asVals){
    var loc = Geolocation.currentLocation();
    if(!loc) return "";
    var locX = loc.coords.latitude;
    var locY = loc.coords.longitude;
    if(asVals){
      return {lon: locX, lat: locY};
    }

    return "" + locX + "," + locY;
  };
