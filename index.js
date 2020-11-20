

const child_process = require('child_process');
const path = require("path");
const state = require("./lib/state");
const startup = require("./lib/startup");
const log = require("./packages/utils/log");

const savepid = process.argv[2] == "savepid"


log(path.join(__dirname,"log"),"PID:"+process.pid)

/* 启动web.js*/
const mainapp = child_process.fork('./main/app.js',[80], {
    cwd:__dirname,
    silent :true,
    stdio:'inherit'
});

mainapp.on("close",function(){
    console.log("close");
});
mainapp.on("error",function(){
    console.log("error");
});

log(path.join(__dirname,"log"),"PID:"+process.pid)

if(savepid){
    state.setWebServicePID(process.pid);
}

var dir = path.join(__dirname,"startup");
startup(dir);
