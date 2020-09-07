const userconfig = require("../lib/userdata");
userconfig.config().then(cfg=>{
    console.log(JSON.stringify(cfg,null,2));
    userconfig.getuserdir(cfg.userdatadir).then(console.log);
});

