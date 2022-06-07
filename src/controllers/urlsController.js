import { nanoid } from 'nanoid';

import connection from './../config/db.js';

export async function insertShortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;

    const shortUrl = nanoid(6);

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

export function getUrlId(req, res) {
    const { existUrl } = res.locals;

    res.status(200).send(existUrl);
}

export async function redirectToUrl(req, res) {
    const { existShortUrl } = res.locals;
    const add = existShortUrl.visitCount + 1;
    const shortUrl = existShortUrl.shortUrl;
    const url = existShortUrl.url;
    try {
        await connection.query(`
            UPDATE links SET "visitCount"=$1
            WHERE "shortUrl"=$2;
        `, [add, shortUrl]);

        return res.redirect(url);
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
} 