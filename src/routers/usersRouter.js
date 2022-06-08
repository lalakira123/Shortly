import { Router } from 'express';

import { userValidation } from './../middlewares/usersMiddleware.js';
import { getRanking, getUserId } from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/users/ranking', getRanking);
usersRouter.get('/users/:id', userValidation, getUserId);

export default usersRouter;