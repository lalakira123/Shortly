import jwt from 'jsonwebtoken';

import connection from './../config/db.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        connection.query(`
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
        `, [name, email, password]);

        res.sendStatus(201);
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}

export function signIn(req, res) {
    const user = res.locals.user;
    const data = { userId: user.id }

    const secretKey = process.env.JWT_SECRET;
    const config = { expiresIn: 60*60*24*7 }
    const token = jwt.sign(data, secretKey, config);

    res.status(200).send(token);
}