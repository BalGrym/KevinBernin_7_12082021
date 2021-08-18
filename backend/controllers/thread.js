const db = require('../models'); 
const { Thread } = require('../models');

exports.getAllThreads = (req, res, next) => {
    db.Thread.findAll()
    .then((threads) => {
        res.send(threads)
    })
    .catch((err) => {
       console.log(err); 
    });
};

exports.getOneThread = (req, res, next) => {
    // res.json({ message: 'un Thread reçu'});
    db.Thread.findOne({ where: { id: req.params.id }})
    .then(threadById => res.send(threadById))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.createThread = (req, res, next) => {
    // console.log(req.body);
    // const threadParsed = JSON.parse(req.body);
    db.Thread.create({
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent
    })
    .then(threadCreated => res.send(threadCreated))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.modifyThread = (req, res, next) => {
    // res.json({ message: "modification d'un thread"});
    db.Thread.findOne({ where: { id: req.params.id }})
    .then(threadById => threadById.update({
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent
    })
        .then(ThreadModified => res.send(ThreadModified))
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
    )
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
}

exports.deleteThread = (req, res, next) => {
    // res.json({ message: "suppression d'un thread"});
    db.Thread.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({message: "Thread Deleted"}))
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}