const express = require("express")
const path = require("path")
const app = express();
const middle_view = require("./middle/view");
const { glob } = require("glob");
const rootpath = path.join(__dirname,"public");
const viewspath = path.join(__dirname,"views");
const routerpath = path.join(__dirname,"router");

app.set('views',viewspath);
app.set('view engine', 'pug');

// 使用中间件处理动态也买你
app.get("/*",middle_view({cwd:path.join(__dirname)}))

app.use(express.static(rootpath))


app.all("/open",function(req,res){
    res.send(`<p>hey</p>`)
})


function usedev(app){
    console.log('[node server] 开始加载路由');
    return new Promise(function(resolve,reject){
        glob("**/*.js",{cwd:routerpath},function(error,files){
            files.map(item=>{
                var basename = path.basename(item);
                var extname = path.extname(item);
                var name =  "/api/"+basename.substr(0,basename.length-extname.length);
                app.use(name,require(path.join(__dirname,"router",item)))
                console.log('\033[42;30m '+ name +' \033[40;32m '+ item +'\033[0m')
                return name;
            });
            console.log("[node server] 路由加载完毕");
            resolve(app);
        });
    })
}

usedev(app).then(()=>{
    app.listen(80,"127.0.0.1",function(){
        console.log("http://127.0.0.1:80")
    })
})