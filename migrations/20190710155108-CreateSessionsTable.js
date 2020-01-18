'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('sessions',
            {
                sid: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true,
                    unique: true
                },
                expires: {
                    type: Sequelize.DATE
                },
                data: {
                    type: Sequelize.STRING(21843)
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                sync: {force: true}
            }
        );
    },

    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('sessions');
    }
};
