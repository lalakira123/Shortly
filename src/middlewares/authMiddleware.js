import connection from './../config/db.js';
import { signUpSchema } from './../schemas/authSchemas.js';

export async function signUpValidationSchema(req, res, next) {
    const validation = signUpSchema.validate(req.body, {abortEarly: false});
    if( validation?.error ) {
        const arrayError = validation.error.details;
        return res.status(422).send(arrayError.map((item) => {return item.message}));
    }

    next();
}

export async function signUpValidation(req, res, next) {
    const { email } = req.body;
    try {
        const query = await connection.query(`SELECT email FROM users WHERE email=$1`, [email]);
        if( query.rowCount !== 0 ) return res.sendStatus(409); 

        next();
    } catch (error) {
        res.send('Não foi possível conectar ao banco');
        console.log(error);
    }
}