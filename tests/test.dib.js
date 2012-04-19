define(['lattice/dib',
        'chai'],

function(dib, chai) {
  var expect = chai.expect;

  describe("dib", function() {
    
    it('1 should equal 1', function() {
      expect(1).to.be.equal(1);
    });
    
  });
  
  return { name: "test.dib" }
});
