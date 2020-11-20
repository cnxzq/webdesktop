const path = require("path");
const fs = require("fs");

var defaultOption = {
    log:true
}

function flags(t,l){
    l=l||2;
    return ("0000"+t.toString()).substr(-l);
}

function time(){
    var d = new Date();
    d = [
        flags(d.getFullYear(),4),
        flags(d.getMonth()+1),
        flags(d.getDate()),
        flags(d.getHours()),
        flags(d.getMinutes()),
        flags(d.getSeconds()),
        flags(d.getMilliseconds(),3)
    ];
    return [d.slice(0,3).join("/"),d.slice(3,6).join(":"),d[6]].join(" ");
}
function log(state,msg){
    var t = time();
    var p = path.join(state.cwd,"log",t.split(" ")[0].replace(/\//g,"")+".log");
    // fs.appendFile 追加文件内容
    // 1, 参数1:表示要向那个文件追加内容,只一个文件的路径
    // 2, 参数2:表示要追加的内容
    // 3, 可选参数,表示追加文本内容的编码格式,如果省略,默认为utf-8
    // 4, 参数4: 表示追加完成之后的回调[有一个参数err,是判断是否追加成功]
    fs.appendFile(p,`\n[${time()}] ${msg}` , (error)  => {
      if (error) return console.log("追加日志" + error.message);
    });
}

function State(cwd,option){
    this.cwd = cwd;
    this.option = option;
    this.init(cwd);
}

State.prototype.init = function(cwd){

}

State.prototype.get = function(name){
    return fs.promises.readFile(this.path(name))
    .then(d=>Buffer.prototype.toString.call(d))
    .catch((err)=>{
        if(err.code){
            return ""
        }else{
            console.info(err);
            throw err;
        }
    })
}
State.prototype.getSync = function(name){
    try{
        let rev = fs.readFileSync(this.path(name))  
        return Buffer.prototype.toString.call(rev)
    }catch(err){
        if(err.code){
            return ""
        }else{
            console.info(err);
            throw err;
        }
    }
}

State.prototype.set = function(name,value){
    log(this,`set [${name}] = [${value}]`)
    return fs.promises.writeFile(this.path(name),value)
}
State.prototype.setSync = function(name,value){
    log(this,`set [${name}] = [${value}]`)
    fs.writeFileSync(this.path(name),value)
}

State.prototype.delete = function(name){
    return fs.promises.unlink(this.path(name))
}
State.prototype.deleteSync = function(name){
    fs.unlinkSync(this.path(name))
}

State.prototype.path = function(name){
    return path.join(this.cwd,encode(name)+".state");
}

function encode(s){
    return (new Buffer.from(s)).toString("base64");
}
function decode(s){
    return new Buffer.from(s, 'base64').toString();
}


module.exports = State;