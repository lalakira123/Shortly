import { Router } from 'express';

import { userValidation } from './../middlewares/usersMiddleware.js';
import { getUserId } from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/users/:id', userValidation, getUserId);
usersRouter.get('/users/ranking');

export default usersRouter;