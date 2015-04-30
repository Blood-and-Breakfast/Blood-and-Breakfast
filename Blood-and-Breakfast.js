Stops = new Mongo.Collection("stops");
Players = new Mongo.Collection("players");
Buses = new Mongo.Collection("buses");



if (Meteor.isClient) {

  Meteor.startup(function() {
    Geolocation.currentLocation();
  });

  Deps.autorun(function(){

  });

  Template.registerHelper("playerLoc", function(){
    return Geolocation.currentLocation();
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
    debugger;
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


