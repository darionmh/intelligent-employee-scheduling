const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Employee", {
        EMPLOYEE_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        LAST_NAME: Sequelize.STRING,
        FIRST_NAME:     Sequelize.STRING
    }, {
        tableName: 'EMPLOYEES',
        timestamps: false,

    })
}