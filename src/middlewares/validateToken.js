import jwt from 'jsonwebtoken';

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