import connection from './../config/db.js';

export async function userValidation(req, res, next) {
    const { id } = req.params;
    try {
        const query = await connection.query(`
            SELECT users.id, users.name, COALESCE(SUM(links."visitCount"),0) as "visitCount" 
            FROM users
            LEFT JOIN links ON users.id=links."userId"
            WHERE users.id=$1 
            GROUP BY users.id;
        `, [ id ]);
        if( query.rowCount === 0 ) return res.sendStatus(404);

        res.locals.user = query.rows[0];

        next();
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
}

