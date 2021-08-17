const db = require('../models'); 
const { Thread } = require('../models');

exports.getAllThreads = (req, res, next) => {
    Thread.findAll()
    .then((threads) => {
        res.send(threads)
    })
    .catch((err) => {
       console.log(err); 
    });
};

exports.getOneThread = (req, res, next) => {
    res.json({ message: 'un Thread reçu'});
};

exports.createThread = (req, res, next) => {
    console.log(req.body);
    const threadParsed = JSON.parse(req.body);
    db.Thread.create({
        articleTitle: threadParsed,
        articleContent: threadParsed,
    })
    .then(threadCreated => res.send(threadCreated))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.modifyThread = (req, res, next) => {
    res.json({ message: "modification d'un thread"});
}

exports.deleteThread = (req, res, next) => {
    res.json({ message: "suppression d'un thread"});
}