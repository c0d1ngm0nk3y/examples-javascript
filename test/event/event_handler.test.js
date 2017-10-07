require('chai').should();
factory = require('../../src/event/event_handler')

describe('event_handler', function() {
  describe('default behaviour', function() {
    it('object should exist', function() {
      var obj = factory.createTypeA();
      obj.should.be.an('Object');
    });

    it('registered handler catches event', function() {
        var event = undefined;
        var spy = function(e) {
          event = e
        };
        var obj = factory.createTypeA();
        obj.registerEventHandler(spy);
        obj.fire({});

        event.should.be.an('Object');
    });

    it('default event', function() {
        var event = undefined;
        var spy = function(e) {
          event = e
        };
        var obj = factory.createTypeA();
        obj.registerEventHandler(spy);
        obj.fire({});

        event.source.should.be.equals('A');
    });

    describe('extended behaviour', function() {
        it('event source was changed', function() {
            var event = undefined;
            var spy = function(e) {
              event = e
            };
            var obj = factory.createTypeB();
            obj.registerEventHandler(spy);
            obj.fire({});
    
            event.source.should.be.equals('B');
        });});        
  });
});