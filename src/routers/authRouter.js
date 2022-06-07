import { Router } from 'express';

import { signUpValidationSchema, signUpValidation } from './../middlewares/authMiddleware.js';
import { signUp } from './../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', signUpValidationSchema, signUpValidation, signUp);
authRouter.post('/signin');

export default authRouter;