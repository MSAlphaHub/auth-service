import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json'
import router from 'express';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
const route = router.Router();

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
  explorer: true
}));
route.use('/api-docs', swaggerUI.serve);
route.get('/api-docs', swaggerUI.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});