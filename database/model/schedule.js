const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Schedule", {
        SCHEDULE_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        BEGINNING_DATE: Sequelize.DATE,
        END_DATE: Sequelize.DATE,
        SCHEDULE_DESC: Sequelize.STRING
    }, {
        tableName: "SCHEDULES",
        timestamps: false
    })
}