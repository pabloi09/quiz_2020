const {Model} = require('sequelize');

// Definition of the Tips model:

module.exports = (sequelize, DataTypes) => {

    class Tip extends Model {}

    Tip.init({
            text: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Tip text must not be empty."}}
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: "tip"
        }
    );

    return Tip;
};
