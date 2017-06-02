const cluster = require('cluster');
var express = require('express');
var app = express();
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
    app.get('/', function (req, res) {
        res.send('Hello from Worker ' + cluster.worker.id);
    });

    // Bind to a port
    app.listen(3000);

  console.log(`Worker ${process.pid} started`);
}