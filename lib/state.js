const State = require("../packages/states/index");

const path = require("path");

var state = new State(path.join(__dirname,"../state"));
var code = {
    webservice:"webservice"
}

module.exports = {
    setWebServicePID:function(pid){
        return state.setSync(code.webservice,pid)
    },
    getWebServicePID:function(){
        return state.getSync(code.webservice)
    },
    delWebServicePID:function(){
        return state.deleteSync(code.webservice)
    }
}