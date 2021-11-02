const db = require('../models')
const jwt = require ('jsonwebtoken');

// exports.createComment = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;

//     console.log(req.params);
//     let threadId = req.params.id;
//     db.Thread.findOne({ where: { id: threadId }})
//     .then(() => { 
//         db.Comment.create({
//             comment: req.body.comment,
//             userId: userId,
//             threadId: threadId
//         })
//         .then(commentCreated => res.send(commentCreated ))
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

exports.getCommentsByThreadId = (req, res, next) => {
    let TdId = req.params.id;
    db.Thread.findOne({ where: { id: TdId }})
    .then(() => { 
        db.Comment.findAll({ where: {threadId: TdId}, include: [db.User]})
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