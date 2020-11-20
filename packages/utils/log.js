
const path = require("path");
const fs = require("fs");

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

module.exports = function log(dirname,msg){
    var t = time();
    var p = path.join(dirname,t.split(" ")[0].replace(/\//g,"")+".log");
    // fs.appendFile 追加文件内容
    // 1, 参数1:表示要向那个文件追加内容,只一个文件的路径
    // 2, 参数2:表示要追加的内容
    // 3, 可选参数,表示追加文本内容的编码格式,如果省略,默认为utf-8
    // 4, 参数4: 表示追加完成之后的回调[有一个参数err,是判断是否追加成功]
    fs.appendFile(p,`\n[${time()}] ${msg}` , (error)  => {
      if (error) return console.log("追加日志" + error.message);
    });
}