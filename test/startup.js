const path = require("path");
const startup = require("../lib/startup");
var dir = path.join(__dirname,"../startup");
startup(dir);