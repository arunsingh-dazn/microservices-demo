import fs from "fs";
import path from "path";

const serviceName = process.argv[2];

if (!serviceName) {
  console.log("Usage:");
  console.log("npm run generate:service <service-name>");
  process.exit(1);
}

const serviceRoot = path.join("apps", serviceName);

const directories = [
  "src",
  "src/config",
  "src/middleware",
  "src/routes",
  "src/models",
  "src/modules",
];

directories.forEach((dir) => {
  fs.mkdirSync(path.join(serviceRoot, dir), {
    recursive: true,
  });
});

const files = {
  ".env": `PORT=3000

SERVICE_NAME=${serviceName}

MONGO_URI=mongodb://localhost:27017/${serviceName.replace("-service", "")}-db

KAFKA_BROKER=localhost:9092
`,

  "nodemon.json": JSON.stringify(
    {
      watch: ["src"],
      ext: "js,json",
      exec: "node src/server.js",
    },
    null,
    2,
  ),

  "package.json": JSON.stringify(
    {
      name: `@microservices-demo/${serviceName}`,
      version: "1.0.0",
      private: true,
      type: "module",
      scripts: {
        dev: "nodemon src/server.js",
      },
      dependencies: {
        "@microservices-demo/shared": "*",
      },
    },
    null,
    2,
  ),

  "src/app.js": `import express from "express";

const app = express();

app.get("/health",(req,res)=>{
    res.json({
        service:process.env.SERVICE_NAME,
        status:"UP"
    });
});

export default app;
`,

  "src/server.js": `import "dotenv/config";

import app from "./app.js";

import {
    logger
} from "@microservices-demo/shared";

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    logger.info(\`🚀 \${process.env.SERVICE_NAME} started on port \${PORT}\`);
});
`,
};

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.join(serviceRoot, file), content);
});

console.log(`✅ ${serviceName} created successfully`);
