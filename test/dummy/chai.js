require('chai').should();
describe('chai', function() {
  describe('should', function() {
    it('41 + 1 = 42', function() {
      var i = 41 + 1;
      i.should.be.equal(42);
    });
  });
});