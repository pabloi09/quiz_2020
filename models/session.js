
const {Model} = require('sequelize');

// Definition of the Session model:

module.exports = (sequelize, DataTypes) => {

    class Session extends Model {}

    Session.init({
            sid: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            expires: {
                type: DataTypes.DATE
            },
            data: {
                type: DataTypes.TEXT
            }
        }, {
            sequelize,
            modelName: "session"
        }
    );

    return Session;
};
