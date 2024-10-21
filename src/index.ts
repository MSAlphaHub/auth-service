import app from "./app";
import http from "http";
import config from "./config";
import logger from "./config/logger";
import { createExitHandler } from "./utils/errors/handler";
const server = http.createServer(app);

const port = config.port;
server.listen(port, () => {
  console.log(`Server is run at http://localhost:${port}`);
});


const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  createExitHandler(server)();
};
process.on("uncaughtException", unexpectedErrorHandler.bind(this));
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
