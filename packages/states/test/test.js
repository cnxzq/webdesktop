const State = require("../index");
const path = require("path");

let state = new State(__dirname);

function test(){
    return state.set("teststate",Date.now())
    .then(()=>state.get("teststate"))
    .then(console.log)
    .then(()=>state.delete("teststate"))
    .then(()=>state.get("teststate"))
    .then(console.log)
}

function testSync(){
    state.setSync("teststate",Date.now());
    var v = state.getSync("teststate");
    console.log(v);
    state.deleteSync("teststate")
    var v = state.getSync("teststate");
    console.log(v);
    return Promise.resolve();
}

test().then(testSync)

