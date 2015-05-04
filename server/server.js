
Meteor.publish('stops', function() {
  return Stops.find();
});

Meteor.publish('markers', function() {
  return Markers.find();
});

Meteor.publish('routes', function() {
  return Routes.find();
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
          //insert stop if it does not exist, otherwise update existing stop document (prevents duplicates)
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
    if (err) {
      console.log("Error getting all Routes: ", err);
    }
    //converts XML from NextBus API to JSON
    xml2js.parseString(res.content, function (err, parsedJson){
      var routes = parsedJson.body.route;
      _.each(routes, function (obj) {
        //update or insert new route document based on if route already exists in collection
        Routes.upsert({tag: obj.$.tag, title: obj.$.title }, {
          tag: obj.$.tag,
          title: obj.$.title
        });
        // gets all stops for each Route and stores them to Stops collection
        getStops(obj.$.tag);
      });
    });
  });
});

// this function is called on an interval to update bus position.
var queryBuses = function(){
  HTTP.get('http://restbus.info/api/agencies/sf-muni/vehicles', function(error, results){
    if (!error){
      Buses.remove({});
      JSON.parse(results.content).forEach( function(element){
        Buses.insert({lat: element.lat, lon: element.lon});
        console.log(element.lat);
      });
    }
  });
};

Meteor.setInterval(queryBuses, 30000); // uncomment this line when you want to start making queries
