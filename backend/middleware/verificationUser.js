const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const userRole = decodedToken.role;

        db.Thread.findOne({ where: { id: req.params.id} })
            .then(thread => {
                if (thread.userId == userId || userRole == 0 ) {
                    next();
                } else { res.send("error") }
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    } catch (error) {
        res.status(401).json({ error: error || 'requête non autorisé'});
    }
}