import { Router } from 'express';

import { urlValidationSchema, validateToken } from './../middlewares/urlsMiddleware.js';
import { insertShortenUrl } from './../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidationSchema, validateToken, insertShortenUrl);
urlsRouter.get('/urls/:id');
urlsRouter.get('/urls/open/:shortUrl');
urlsRouter.delete('/urls/:id');

export default urlsRouter;