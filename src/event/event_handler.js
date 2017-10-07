function AClass() {
    var _eventHandler = undefined;

    function fire(event) {
        event.source = "A";
        if(_eventHandler) {
            _eventHandler(event);
        }
    }

    function registerEventHandler(eventHandler) {
        _eventHandler = eventHandler;
    }

    return {
        fire,
        registerEventHandler
    }
}

function createTypeA() {
    return AClass();
}


function createTypeB() {
    var obj = AClass();

    var oldRegister = obj.registerEventHandler
    function newRegister(eventHandler) {
        //do not register the handler, but a proxy that first changes the event
        function eventHandlerProxy(event) {
            event.source = "B";
            eventHandler(event);
        }

        //call the original register within the new one
        oldRegister(eventHandlerProxy);
    }
    //switch register method
    obj.registerEventHandler = newRegister;

    return obj;
}

module.exports = {
    createTypeA,
    createTypeB
}