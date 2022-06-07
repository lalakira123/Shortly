import jwt from 'jsonwebtoken';

import connection from './../config/db.js';
import urlSchema from "./../schemas/urlsSchema.js";

export async function urlValidationSchema(req, res, next) {
    const validation = urlSchema.validate(req.body);
    if( validation?.error ) {
        const arrayError = validation.error.details;
        return res.status(422).send(arrayError.map((item) => {return item.message}));
    }

    next();
}

export function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, result) => { 
        if(err) return res.status(401).send({ err: err });
        if(result) {
            res.locals.userId = result.userId;
            next();
        }
    });
}

export async function urlsIdValidation(req, res, next) {
    const { id } = req.params;
    try {
        const existUrl = await connection.query(`
            SELECT links.id, links."shortUrl", links.url
            FROM links
            WHERE links.id = $1;
        `, [id]);
        if( existUrl.rowCount === 0 ) return res.sendStatus(404);

        res.locals.existUrl = existUrl.rows[0];

        next();
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}