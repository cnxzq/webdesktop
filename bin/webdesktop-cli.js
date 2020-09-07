#!/usr/bin/env node
"use strict";
var program = require('commander');
var pkg = require("../package.json");
program
    .version(pkg.version)
    .usage('<command> [option]') //, 'option --type required'
    //.command('npm', '使用npm命令')
    //.command('serve', '使用serve命令')
    //.command('git', '使用git命令')
    .parse(process.argv);