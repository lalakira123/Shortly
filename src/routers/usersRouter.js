import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/users/:id');
usersRouter.get('/users/ranking');

export default usersRouter;