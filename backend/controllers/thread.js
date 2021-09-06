const db = require('../models'); 


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
    db.Thread.create({
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent,
        userId: req.body.userId
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

// exports.createComment = (req, res, next) => {
//     let threadId = req.params.id;
//     console.log(threadId)
//     db.Thread.findOne({ where: { id: threadId }})
//     .then(thread => { 
//         db.Comment.create({
//             comment: req.body.comment,
//             userId: req.body.userId,
//             threadId: threadId
//         })
//         .then(commentCreated => res.send(thread || commentCreated ))
//         .catch(err => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     })
//     .catch(err => {
//         if (err) {
//             console.log(err);
//         }
//     });
// };

// exports.getCommentsByThreadId = (req, res, next) => {
//     let TdId = req.params.id;
//     db.Thread.findOne({ where: { id: TdId }})
//     .then(() => { 
//         db.Comment.findAll({ where: {threadId: TdId}})
//         .then((threadAndComments) => {
//             res.send( threadAndComments)
            
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     })
//     .catch(err => {
//         if (err) {
//             console.log(err);
//         }
//     });
// }