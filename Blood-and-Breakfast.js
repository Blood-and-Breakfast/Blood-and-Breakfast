
Markers = new Mongo.Collection('markers');
Stops = new Mongo.Collection("stops");
Players = new Mongo.Collection("players");
Buses = new Mongo.Collection("buses");
Routes = new Mongo.Collection('routes');


if (Meteor.isClient) {

  Meteor.startup(function() {
    //fire this here to get permission to use geoloc in browser
    Geolocation.currentLocation();
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
    //TODO need to find the best place to call this
    //and whether or not it needs to be called more than once ever
    addBusStops();

  };

  Template.header.rendered = function(){
  };

  var setBodyToWindowSize = function(){
    var theBody = $("body");
    theBody.height($(window).height());
    theBody.width($(window).width());
  };

  //this is a global access point for the Session
  //usage in templates is {{session "key"}}
  Template.registerHelper("session", function(key){
    return Session.get(key);
  });

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
    },
     "click .biteButton": function () {
      // Set the checked property to the opposite of its current value
      triggerBite(Session.get("team"));
    }
  });

  //TODO: this is only setting team name temp in client session
  //Need to attach it to the user in db
  var setTeamName = function(name){
    Session.set("team", name);
    if(name === "zombies"){
      Session.set("isZombie", true);
    }else{
      Session.set("isZombie", false);
    }
  }


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}




