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