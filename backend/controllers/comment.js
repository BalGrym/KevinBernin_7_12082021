const db = require('../models')

exports.createComment = (req, res, next) => {
    console.log(req.params);
    let threadId = req.params.id;
    db.Thread.findOne({ where: { id: threadId }})
    .then(() => { 
        db.Comment.create({
            comment: req.body.comment,
            userId: req.body.userId,
            threadId: threadId
        })
        .then(commentCreated => res.send(commentCreated ))
        .catch(err => {
            if (err) {
                console.log(err);
            }
        });
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.getCommentsByThreadId = (req, res, next) => {
    let TdId = req.params.id;
    db.Thread.findOne({ where: { id: TdId }})
    .then(() => { 
        db.Comment.findAll({ where: {threadId: TdId}})
        .then((threadAndComments) => {
            res.send( threadAndComments)
            
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    });
}