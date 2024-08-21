import cluster from "cluster";
import os from "os";
import { container } from "./inversify.config";
import { CarsCronJobService } from "./application/services/cron_jobs/carsCronJobService";
import { TYPES } from "./application/utilities/types";

const numCPUs = os.cpus().length; // use pm2

async function index() {
  const IoCModule = require("./inversify.config");
  container.load(IoCModule.referenceDataIoCModule());
  const bootstrap = require("./server");

  await bootstrap.bootstrap();
  const cronJobService = container.get<CarsCronJobService>(
    TYPES.CarsCronJobService
  );
  cronJobService.startJob();
  console.log("Cron job scheduled.");
}

index();

// const workerFunction = async () => {
//   await index();
// };

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//     console.log(`Worker ${i} forked`);
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   // Worker processes
//   workerFunction();
// }
