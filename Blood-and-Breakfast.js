
Markers = new Mongo.Collection('markers');
Stops = new Mongo.Collection("stops");
Players = new Mongo.Collection("players");
Buses = new Mongo.Collection("buses");
Routes = new Mongo.Collection('routes');


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

  Template.header.rendered = function(){
  };

  var setBodyToWindowSize = function(){
    var theBody = $("body");

    theBody.height($(window).height());
    theBody.width($(window).width());
  };



  Template.registerHelper("session", function(key){
    return Session.get(key);
  });

  Template.everything.helpers({
    giraffe: function () {
      return "Giraffe";
    },
    teamName: function(){
      return Session.get("team");
    },
    isZombie: function(){
      return Session.get("team") === "zombies";
    },
    isVampire: function(){
      return Session.get("team") === "vampires";
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

  var setTeamName = function(name){
    Session.set("team", name);
  }


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}




