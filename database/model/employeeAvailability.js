const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("EmployeeAvailability", {
        EMPLOYEE_ID: Sequelize.INTEGER,
        START_TIME: Sequelize.DATE,
        END_TIME: Sequelize.DATE
    }, {
        tableName: "EMPLOYEE_AVAILABILITY",
        timestamps: false
    })
}