
const path = require("path");
const child_process = require("child_process");

let mainapp = child_process.fork('app.js',[8080], {
    cwd:path.join(__dirname,"../main"),
    silent :true,
    stdio:'inherit'
});


mainapp.on("data",function(err,){})