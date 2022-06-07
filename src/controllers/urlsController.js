import { customAlphabet } from 'nanoid';

import connection from './../config/db.js';

export async function insertShortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;

    const nanoid = customAlphabet(url, 8);
    const shortUrl = nanoid();

    try {
        await connection.query(`
            INSERT INTO links("shortUrl", url, "userId")
            VALUES($1, $2, $3)
        `, [shortUrl, url, userId])
        
        res.status(201).send({shortUrl});
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}