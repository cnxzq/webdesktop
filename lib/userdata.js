const yaml = require("node-yaml");
const os = require("os");
const path = require("path");
const fs = require("fs");
const pkg = require("../package.json");


const homedir = os.homedir();
const path_userdatafile = path.join(homedir,"."+pkg.name+"rc")
const dir_userdata = path.join(homedir,pkg.name)


const defaultData = {
    version:pkg.version,
    userdatadir:dir_userdata,
    app:{
        dir:"c:/ccc"
    }
}

// 初始化用户配置文件
function initfile(){
    return yaml.write(path_userdatafile, defaultData,{})
}

// 初始化用户目录
function getuserdir(userdatadir){
    return fs.promises.mkdir(userdatadir, { recursive: true }).then(_=>userdatadir);
}

function config(){
    return yaml.read(path_userdatafile)
    .catch(err => {
        if(err.code === "ENOENT"){
                console.log(`未发现用户数据文件[${path_userdatafile}]，开始创建`)
                return initfile().then(function(){
                    console.log(`用户数据文件[${path_userdatafile}]已创建`)
                }).then(exports.config)
        }else{
            console.error("Error while reading file:\n\n%s", String(err))
        }
    })
}

exports.config = config;
exports.getuserdir=getuserdir;