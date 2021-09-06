const db = require('../models');
const User = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) 
    .then(hash => {
        db.User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash
        })
        .then(userCreated => res.send(userCreated))
        .catch(err => {
            if (err) {
                console.log(err);
                res.status(400).json({ err })
            }
        })
    })
    .catch(error => res.status(500).json({ error }));
        
};

exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email}})
    .then(user => {
        if (!user) {
            return res.status.status(401).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "mot de passe incorrect"});
            }
            res.status(200).json({
                userId: user.id,
                role: user.role,
                token: jwt.sign(
                    { userId: user.id, role: user.role },
                    
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}