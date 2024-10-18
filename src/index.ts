import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import config from "./config";
import { v4 as uuidv4 } from "uuid"

const a = uuidv4();
console.log(a);
const app: Application = express();
const router = express.Router();

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
  res.send("Welcome to Express & TypeScript Server");
});

const port = config.PORT;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
