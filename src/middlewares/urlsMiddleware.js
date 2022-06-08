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

export async function shortUrlValidation(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const existShortUrl = await connection.query(`
            SELECT * 
            FROM links
            WHERE "shortUrl" = $1; 
        `, [shortUrl]);
        if( existShortUrl.rowCount === 0 ) return res.sendStatus(404);

        res.locals.existShortUrl = existShortUrl.rows[0];

        next();
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}

export async function userContainShortUrl(req, res, next) {
    const { id } = req.params;
    const { userId } = res.locals;
    try {
        const query = await connection.query(`
            SELECT * FROM links WHERE id=$1;
        `, [id]);
        if( query.rowCount === 0 ) return res.sendStatus(404);
        if( query.rows[0].userId !== userId ) return res.sendStatus(401);

        next();
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}

