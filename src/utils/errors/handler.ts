import { Server } from "http";
import logger from "../../config/logger";
import rabbitMQ from "../../queues";

export const createExitHandler = (server: Server) => {
  return () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        rabbitMQ.close()
        process.exit(1);
      });
    }
  };
};
