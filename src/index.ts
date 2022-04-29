import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import showError from './middleware/showError';
import invalidPage from './middleware/invalidPage';
config();

const port = process.env.PORT || 4000;
const app = express();

// MIDDLEWARES
app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('HOME');
});
app.use('/api', router);

// ERROR HANDLING MIDDLEWARES
app.use(showError);
app.use(invalidPage);

//STARTING SERVER
app.listen(port, () => {
  console.log('** SERVER STARTED **');
});

export default app;
