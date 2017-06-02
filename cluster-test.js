var cluster = require('cluster');
var express = require('express');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var app = express();
    app.get('/', function (req, res) {
        res.send('Hello from Worker ' + cluster.worker.id);
    });

    app.all('/*', function(req, res) {
        res.send('process ' + process.pid + ' says hello!').end();
    })

    var server = app.listen(3000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}