module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: {
                args: true,
                msg: "Email already used for an account"
            },
            validate: {
                notEmpty: true
            }
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING(80),
            allowNull: false,
            validate: {
                notEmpty: true,
                // isLowercase: true,
               
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    });

    return User;
}