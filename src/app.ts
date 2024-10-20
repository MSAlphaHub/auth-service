import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import logger from "./config/logger";
import httpStatus from "http-status-codes";
import routes from "./routes/v1";
import ApiError from "./utils/errors/ApiError";
import { errorConverter, errorHandler } from "./middlewares/error";

const app: Application = express();
const router = express.Router();

// middleware parse json in body
app.use(express.json({ limit: "100mb" }));

// Swagger
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
  })
);
router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocument));

app.get("/whoami", (req: Request, res: Response) => {
  logger.info(req);
  res.send("Welcome to Express & TypeScript Server");
});

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
