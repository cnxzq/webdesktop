#!/usr/bin/env node
"use strict";
var program = require('commander');
var pkg = require("../package.json");
var svc = require('../window-service');


program
    .version(pkg.version) 
    //.usage('<command> [option]') //, 'option --type required'
    //.option('-s, --start', 'output extra debugging')
    .command('start', '启动')
    .command('stop', '停止')
    .command('help', '显示帮助信息')

program
.command('install')
.description('安装[window service]:'+svc.info.name)
.action(() => {
    console.log('开始安装...');
    svc.service.install();
});
program
.command('uninstall')
.description('卸载[window service]:'+svc.info.name)
.action(() => {
    console.log('开始卸载...');
    svc.service.uninstall();
});
program
.command('clone <source> [destination]')
.description('clone a repository into a newly created directory')
.action((source, destination) => {
    console.log('clone command called ' + source,destination);
});

// must be before .parse()
program.on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('  webdesktop start');
    console.log('  webdesktop stop');
    console.log('  webdesktop install');
    console.log('  webdesktop uninstall');
});
program.parse(process.argv);