import { Router } from 'express';

import { urlValidationSchema, validateToken, urlsIdValidation } from './../middlewares/urlsMiddleware.js';
import { insertShortenUrl, getUrlId } from './../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidationSchema, validateToken, insertShortenUrl);
urlsRouter.get('/urls/:id', urlsIdValidation, getUrlId);
urlsRouter.get('/urls/open/:shortUrl');
urlsRouter.delete('/urls/:id');

export default urlsRouter;