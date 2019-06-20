const Sequelize = require("sequelize")
const fs = require('fs');
const rdsCa = fs.readFileSync(__dirname + '/../config/amazon-rds-ca-cert.pem');

module.exports = () => {
    /** Setup */
    // const sequelize = new Sequelize(process.env.DATABASE_URL, {})
    const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
        host: process.env.DATABASE_URL,
        dialect: 'mysql',
        ssl: true,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,
                ca: [rdsCa]
            }
        },
        define: {
        timestamps: false
        },
        pool: {
        max: 5,
        min: 0,
        idle: 10000
        },
    })

    sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    return sequelize
}