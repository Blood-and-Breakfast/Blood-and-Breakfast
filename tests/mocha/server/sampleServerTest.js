if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should have a Meteor version defined", function(){
        chai.assert(Meteor.release);
      });

      it("should insert bus routes into the database after server starts", function() {
        chai.assert(Routes.find().count() > 0);
      });

      it("should insert bus stops into the database after server start", function() {
        chai.assert(Stops.find().count() > 0);
      });
    });
  });
}
