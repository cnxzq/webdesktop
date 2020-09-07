const glob = require("glob")
const path = require("path")


var getdata = function(dtl){
    return Promise.resolve(dtl && typeof dtl.constructor == "function"?dtl():dtl)
}

module.exports = function(option){
    var datas = {};
    var views = [];
    glob("**/*.js",{cwd:path.join(option.cwd,"datas")},function(err,files){
        files.forEach(item=>{
            var key = item.slice(0,item.lastIndexOf(".js"));
            datas[key]=require(path.join(option.cwd,"datas",key))
        })
    })
    glob("**/*.pug",{cwd:path.join(option.cwd,"views")},function(err,files){
        views = files.map(item=>{
            return item.slice(0,item.lastIndexOf(".pug"));
        })
    })

    return function(req,res,next){
        var key = req.path.slice(1);
        if(views.indexOf(key)>-1){
            getdata(datas[key])
            .then(d=>res.render(key,d||{}));
        }else{
            next();
        }
    }
}