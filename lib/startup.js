
const fs = require("fs");
const execFile = require("child_process").execFile;


module.exports = function(dir){
    fs.readdir(dir,function(err,files){
        if(!err){
            console.log(files);
            files.forEach(file=>{
                console.log(file);
                let child_proc = execFile(
                    file, [1, 2],{
                        cwd:dir,
                        stdio:'inherit',
                        silent :true,
                        //var encoding = 'cp936';
                        //var binaryEncoding = 'binary';
                        //encoding: '65001'
                    }
                )
                
                child_proc.stdout.on('data', function(data) {
                  console.log(data);
                });
                
            });
        }
    })
}
