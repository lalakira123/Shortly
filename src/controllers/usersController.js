import connection from './../config/db.js';

export async function getUserId(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
    try {
        const query = await connection.query(`
            SELECT links.id, links."shortUrl", links.url, links."visitCount"
            FROM links
            WHERE links."userId"=$1;
        `, [ id ]); 
        const listOfUrls = query.rows;
        const userInformation = {...user, shortenedUrls: listOfUrls};

        res.status(200).send(userInformation);
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}

export async function getRanking(req, res) {
    try {
        const query = await connection.query(`
            SELECT 
                users."id", 
                users."name", 
                COUNT(links."userId") as "linksCount", 
                SUM(links."visitCount") as "visitCount"
            FROM users
            JOIN links ON users."id"=links."userId"
            GROUP BY users."id"
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `);
        const ranking = query.rows;

        res.status(200).send(ranking);
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}