const path = require("path");
const child_precss = require("child_process")

let dir = path.join(__dirname,"../startup");

let child_proc = child_precss.execFile("内网路由.bat",{
        cwd:dir,
        stdio:'inherit',
        silent :true,
        //encoding: 'binary'
        //var encoding = 'cp936';
        //var binaryEncoding = 'binary';
        //
    },(err, stdout, stderr) => {
        stdout && console.log(stdout)
        err && console.log(err)
        stderr && console.log(stderr)
    }
)