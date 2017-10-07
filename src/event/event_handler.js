function AClass() {
    function registerEventHandler(oEventHandler) {
        var self = this, fnEventHandler;

        function symbolEventHandler(oEvent) {
            oEvent.source = "A";
            fnEventHandler.apply(self, arguments);
        }
        fnEventHandler = oEventHandler.callback
        oEventHandler.registeredEventHandler = symbolEventHandler;
    }

    return {
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
        var oldCallback = eventHandler.callback;
        function callbackProxy(event) {
            event.source = "B";
            oldCallback(event);
        }
        eventHandler.callback = callbackProxy;

        oldRegister(eventHandler);
    }
    //switch register method
    obj.registerEventHandler = newRegister;

    return obj;
}

module.exports = {
    createTypeA,
    createTypeB
}