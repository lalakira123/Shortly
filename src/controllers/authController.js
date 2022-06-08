import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connection from './../config/db.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        connection.query(`
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
        `, [name, email, passwordHash]);

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
    const config = { expiresIn: 60*60*12 }
    const token = jwt.sign(data, secretKey, config);

    res.status(200).send({name: user.name, token});
}