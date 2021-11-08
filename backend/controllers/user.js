const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');

exports.signup = (req, res, next) => {
    const emailHash = sha256(req.body.email);
    console.log(emailHash);
    bcrypt.hash(req.body.password, 10) 
    .then(hash => {
        db.User.create({
            email: emailHash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash
        })
        .then(userCreated => res.send(userCreated))
        .catch(err => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: 'Invalid Email' })
            }
        })
    })
    .catch(error => res.status(500).json({ error }));
        
};

exports.login = (req, res, next) => {
    const emailHash = sha256(req.body.email);
    db.User.findOne({ where: { email: emailHash}})
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
};

exports.userInfo = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    db.User.findOne({ where: { id: userId}})
    .then(userInfos => {
        res.send(userInfos);
    })
    .catch(error => {
        console.log(error);
    })
}; 

exports.modifyUserInfo = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, { where: { id: userId }})
    .then(ThreadModified => res.send(ThreadModified))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })    
}; 

exports.deleteThread = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    db.User.destroy({ where: { id: userId }})
        .then(() => {
            res.status(200).json({message: "Account Deleted"})
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}