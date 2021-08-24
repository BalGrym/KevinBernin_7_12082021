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
    });
    return Comment;
}