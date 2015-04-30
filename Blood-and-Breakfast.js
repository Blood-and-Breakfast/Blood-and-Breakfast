Markers = new Mongo.Collection('markers');  
Stops = new Mongo.Collection("stops");
Players = new Mongo.Collection("players");
Buses = new Mongo.Collection("buses");



if (Meteor.isClient) {

  Meteor.startup(function() {
    Geolocation.currentLocation();
    //get window info

  });

  Deps.autorun(function(){

  });

  Tracker.autorun(function(){

  });

  Template.everything.rendered = function(){
    setBodyToWindowSize();
  }

  Template.everything.created = function() {
    $(window).resize(function() {
      setBodyToWindowSize();
    });
  };

  var setBodyToWindowSize = function(){
    var theBody = $("body");
    theBody.height($(window).height());
    theBody.width($(window).width());
  }

  Template.registerHelper("playerLoc", function(){
    var loc = Geolocation.currentLocation()
    var locX = loc.coords.latitude;
    var locY = loc.coords.longitude;
    return "" + locX + "," + locY;
  })

  Template.registerHelper("session", function(key){
    return Session.get(key);
  })

  Template.everything.helpers({
    giraffe: function () {
      return "Giraffe";
    },
    teamName: function(){
      return Session.get("team");
    }
  });

  Template.everything.events({
    "click .playZombies": function () {
      // Set the checked property to the opposite of its current value
      setTeamName("zombies");
    },
    "click .playVampires": function () {
      // Set the checked property to the opposite of its current value
      setTeamName("vampires");
    }
  });

  var setTeamName = function(name){
    Session.set("team", name);
  }


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



