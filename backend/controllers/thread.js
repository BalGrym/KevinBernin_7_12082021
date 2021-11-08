const db = require('../models'); 
const jwt = require ('jsonwebtoken');


exports.getAllThreads = (req, res, next) => {
    db.Thread.findAll({
        include: [db.User]
    })
    .then((threads) => {
        res.send(threads)
    })
    .catch((err) => {
       console.log(err); 
    });
};

exports.getOneThread = (req, res, next) => {
    let TdId = req.params.id;
    db.Thread.findOne({ where: { id: TdId }})
    .then(threadById => { 
        res.send(threadById)
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.createThread = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    db.Thread.create({
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent,
        userId: userId
    })
    .then(threadCreated => res.send(threadCreated))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.modifyThread = (req, res, next) => {
    db.Thread.update({
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent
    }, { where: { id: req.params.id }})
    .then(ThreadModified => res.send(ThreadModified))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })    
}

exports.deleteThread = (req, res, next) => {
    db.Thread.destroy({ where: { id: req.params.id }})
        .then(() => {
            db.Comment.destroy({ where: {threadId: req.params.id}})
            .then(() => res.status(200).json({message: "Thread Deleted"}))
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}