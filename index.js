#!/usr/bin/env node

/*
 * Обертка для `grunt-cli`
 * Перед выполнением `grunt` проверяет установлены необходимые для него зависимости
 *
 * @require `sudo npm i -g check-dependencies`
 *
 * @author dryzhov@yandex-team.ru
 */

var spawn = require('child_process').spawn;
var arg = process.argv.slice(2);

//	запускает проверку зависимостей
//	(grunt-tasks, node_modules)
require('check-dependencies')({
    install: true,
    verbose: true
}, function() {
	
	var path = require('path').dirname(process.mainModule.filename);

	//	добавляет путь к grunt-cli
	arg.unshift(path + '/node_modules/.bin/grunt');

	//	выполняет `grunt` через child_process.spawn
    var grunt = spawn('node', arg);

    grunt.stdout.on('data', function (data) {
    	//	логи Gruntjs
        console.log('' + data);
    });

    grunt.stderr.on('data', function (data) {
    	//	ошибки Gruntjs
        console.log('`grunt` stderr: ' + data);
    });

    grunt.on('close', function (code) {
        console.log('`grunt` exited with code ' + code + '\n');
    });
});
