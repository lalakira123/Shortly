import { Router } from 'express';

import { urlValidationSchema, urlsIdValidation, shortUrlValidation, userContainShortUrl } from './../middlewares/urlsMiddleware.js';
import { validateToken } from './../middlewares/validateToken.js';
import { insertShortenUrl, getUrlId, redirectToUrl, deleteUrl } from './../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidationSchema, validateToken, insertShortenUrl);
urlsRouter.get('/urls/:id', urlsIdValidation, getUrlId);
urlsRouter.get('/urls/open/:shortUrl', shortUrlValidation, redirectToUrl);
urlsRouter.delete('/urls/:id', validateToken, userContainShortUrl, deleteUrl);

export default urlsRouter;