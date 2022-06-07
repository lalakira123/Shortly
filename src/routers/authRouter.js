import { Router } from 'express';

import { 
        signUpValidationSchema, 
        signUpValidation, 
        signInValidationSchema, 
        signInValidation 
} from './../middlewares/authMiddleware.js';
import { signUp, signIn } from './../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', signUpValidationSchema, signUpValidation, signUp);
authRouter.post('/signin', signInValidationSchema, signInValidation, signIn);

export default authRouter;