
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
    updateClientToTeam();
  }

  Template.everything.created = function() {
    $(window).resize(function() {
      setBodyToWindowSize();
    });

    //TODO need to find the best place to call this
    //and whether or not it needs to be called more than once ever
    //addBusStops();

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

  Template.loginPage.helpers({
    wipeTeamName: function(){
      Session.set("team", null);
    }
  })

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
    Meteor.call("setUserName", name);
    if(name === "zombies"){
      Session.set("isZombie", true);
    }else{
      Session.set("isZombie", false);
    }
    updateClientToTeam();
  }

  //handles updating all divs and templates to a theme based on team
  updateClientToTeam = function(){

    if(!Session.get('team')) return;

    var isZombie = Session.get('isZombie');
    setMapStyleToTeam(isZombie);

    var team = "zombies";
    var notTeam = "vampires";


    if(!isZombie){
      team = "vampires";
      notTeam = "zombies";
    }

    var main = $('#main');
    var topBar = $('#topBar');
    var gameSelect = $('#gameSelect');
    var loginPage = $('loginPage');
    var gamePlay = $('gamePlay');

    if(main){
      main.removeClass(notTeam);
      main.addClass(team);
    }
    if(topBar){
      topBar.removeClass(notTeam);
      topBar.addClass(team);
    }
    if(gameSelect){
      gameSelect.removeClass(notTeam);
      gameSelect.addClass(team);
    }
    if(loginPage){
      loginPage.removeClass(notTeam);
      loginPage.addClass(team);
    }
    if(gamePlay){
      gamePlay.removeClass(notTeam);
      gamePlay.addClass(team);
    }
  }


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}




