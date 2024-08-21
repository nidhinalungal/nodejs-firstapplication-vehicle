import { AppsOptions } from 'pm2';

const config: AppsOptions[] = [{
  name: "my-app",
  script: "./index.ts", // entry point of your application
  instances: "max", // or a number of instances
  exec_mode: "cluster",
  interpreter: "ts-node",
  watch: true,
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
  },
}];

export default config;
