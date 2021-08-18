const db = require('../models');
const User = require('../models');

exports.signup = (req, res, next) => {
    db.User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    .then(userCreated => res.send(userCreated))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.login = (req, res, next) => {
    res.json({ message: "utilisateur connecté"});
}