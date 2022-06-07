import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routers/authRouter.js';
import urlsRouter from './routers/urlsRouter.js';
import usersRouter from './routers/usersRouter.js';

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(process.env.PORT, () => console.log('Servidor Conectado!'));
