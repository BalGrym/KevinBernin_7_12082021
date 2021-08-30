const db = require('../models')

exports.createComment = (req, res, next) => {
    let threadId = req.params.id;
    console.log(threadId)
    db.Thread.findOne({ where: { id: threadId }})
    .then(thread => { 
        db.Comment.create({
            comment: req.body.comment,
            userId: req.body.userId,
            threadId: threadId
        })
        .then(commentCreated => res.send(thread || commentCreated ))
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