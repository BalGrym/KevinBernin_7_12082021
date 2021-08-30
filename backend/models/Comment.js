module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
                }
        },     
        upVote: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        downVote: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            } 
        },
        threadId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            } 
        }
    });
    return Comment;
}