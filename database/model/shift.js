const Sequelize = require("sequelize")

module.exports = (sequelize) =>{ 
    return sequelize.define("Shift", {
        SHIFT_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        SCHEDULE_ID: Sequelize.INTEGER,
        START_TIME: Sequelize.DATE,
        END_TIME: Sequelize.DATE,
        SHIFT_DESC: Sequelize.STRING,
        EMPLOYEES_REQ: Sequelize.INTEGER
    }, {
        tableName: "SHIFTS",
        timestamps: false
    })
}