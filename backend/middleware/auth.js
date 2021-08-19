const jwt = require('jsonwebtoken');
const { copy } = require('../routes/thread');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const uderId = decodedToken.id;
        if (req.body.id && req.body.id !== userId) {
            throw 'User ID non valable';
        } else { 
            next();
        }
    }catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée'});
    }
};