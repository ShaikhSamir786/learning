const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const express = require('express');


if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send(`Hello World from worker ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening at http://localhost:${port}`);
  });
}