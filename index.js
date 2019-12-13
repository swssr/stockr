const cpus = require("os").cpus();
const http = require("http");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const report = (type = "master", id = process.pid) => ({
  type,
  id
});

if (cluster.isMaster) {
  console.log(report());
  //Spawn clusters bro!
  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }

  cluster.on("exit", worker => {
    const msg = `worker process ${process.pid} has died.`;
    console.log(msg);
    //TODO: send an email to me if anything breaks
    cluster.fork();
    console.log(`new worker process spawned.`);
  });
} else {
  http.createServer(app).listen(9000);
}
