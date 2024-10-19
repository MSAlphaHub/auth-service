import { Server } from "http";
import logger from "../../config/logger";

export const createExitHandler = (server: Server) => {
  return () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    }
  };
};
