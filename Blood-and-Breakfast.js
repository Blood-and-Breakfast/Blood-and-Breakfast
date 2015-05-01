
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

  var setBodyToWindowSize = function(){
    var theBody = $("body");
    theBody.height($(window).height());
    theBody.width($(window).width());
  }

  Template.registerHelper("playerLoc", function(){
    var loc = Geolocation.currentLocation();
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

    //function is used in _.each statement to get stops while getting routes
    var getStops = function (tag) {
      HTTP.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r='+tag, function (err, res) {
              xml2js.parseString(res.content, function (err, parsedJson) {
                if (err) {
                  console.log("Error getting stops for Route "+ tag);
                }
                var stops = parsedJson.body['route'][0]['stop'];
                _.each(stops, function (obj) {
                  Stops.upsert({stopId: obj.$.stopId}, {
                    tag: obj.$.tag,
                    title: obj.$.title,
                    lat: obj.$.lat,
                    lon: obj.$.lon,
                    stopId: obj.$.stopId
                  })
                })
              });
          })
        };
    //fetches all routes from NextBus and stores them to MongoDB Routes
    HTTP.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni', function (err, res) {
      //converts XML from NextBus API to JSON
      if (err) {
                  console.log("Error getting all Routes");
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
}



