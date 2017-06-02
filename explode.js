const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }

  /*
 cluster.on('exit', function() {
    console.log('A worker process died, restarting...');
    cluster.fork();
  });
  */

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
    app.get('/', function (req, res) {
        res.send('Hello from Worker ' + cluster.worker.id);
    });

    app.get('/explode', function(req, res) {
        setTimeout(function() {
        res.send(this.wont.go.over.well);
        }, 1);
    });

    // Bind to a port
    app.listen(3000);

    console.log(`Worker ${process.pid} started`);
}

