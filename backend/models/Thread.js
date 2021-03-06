// const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Thread = sequelize.define("Thread", {
        articleTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        articleContent: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            } 
        }
    });
    // User.hasMany(Thread, {foreignKey: 'userId'});
    return Thread;
}