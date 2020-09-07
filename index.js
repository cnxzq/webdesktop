const child_process = require('child_process');

	
/* 启动web.js*/
const mainapp = child_process.fork('./main/app.js', {
    cwd:__dirname,
    silent :true,
    stdio:'inherit'
});
