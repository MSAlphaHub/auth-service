import app from "./app";
import http from "http";
import config from "./config";
import logger from "./config/logger";
import { createExitHandler } from "./utils/errors/handler";
import rabbitMQ from "./queues"
import SocketConnection from "./socket"

const server = http.createServer(app);

// INITIAL Socket Connection
new SocketConnection(server);

const port = config.port;
server.listen(port, () => {
  console.log(`Server is run at http://localhost:${port}`);
});


const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  createExitHandler(server)();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
    rabbitMQ.close()
  }
});
