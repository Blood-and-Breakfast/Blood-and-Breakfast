

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
