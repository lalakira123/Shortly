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