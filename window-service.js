const win = require('node-windows');
const Service = win.Service;
const path = require("path");
const state = require("./lib/state");


win.isAdminUser(function(isAdmin){
  if (!isAdmin) {
    console.log('需要管理员权限');
  }
});

const option = {
  name:'Web Desktop',//服务名
  description: 'ZQ 的 Web 桌面系统服务', //服务描述
  script: path.join(__dirname,"index.js"),//要启动的文件路径
  scriptOptions: 'savepid'
};

// Create a new service object
const svc = new Service(option);

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  var pid = state.getWebServicePID();
  if(pid){
    console.log('存在残留服务');
    win.kill(pid,function(){
      state.delWebServicePID();
      console.log('服务已安装，开始启动 Web 服务');
      svc.start();
      console.log('http://localhost');
    });
  }else{
    console.log('服务已安装，开始启动 Web 服务');
    svc.start();
    console.log('http://localhost');
  }
});
 
// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('服务已卸载');
  console.log('服务状态: ',svc.exists);
  console.log('服务已卸载');
  console.log('检查 web 服务');
  //return;
  var pid = state.getWebServicePID();

  if(pid){
    console.log('web 服务启动中');
    win.kill(pid,function(){
      state.delWebServicePID();
      console.log('web 服务已卸载');
    });
  }
});
 
exports.service = svc;
exports.info = option;
