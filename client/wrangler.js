//no need to wrap everything in if (Meteor.isClient) {} since file is in the client folder

  Meteor.startup(function() {

  });

  Meteor.subscribe('stops');
  Meteor.subscribe('markers');
  Meteor.subscribe('routes');
  Meteor.subscribe('players');


  //TODO: make this do something
  //query db for all stops and buses within n distance of player
  //set bite button timer on client and server
  //disable bit button until timer resets
  var infectArea = function(teamName){
    var loc = playerLoc;
    var team = teamName;
    var id = Meteor._id;

  };

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

  Template.registerHelper("playerLoc", function(){
    return playerLoc();
  });

  Template.registerHelper("addBusStops", function(){
    return addBusStops();
  });
