if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("a group of tests", function(){
      it("should respect equality", function(){
        chai.assert.equal(5,5);
      });
    });

    describe('geolocation based data', function() {
      it('should add markers for nearby bus stops based on location', function() {

      });
    });
  });
}
