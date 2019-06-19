const express = require("express")
const app = express()
const Sequelize = require("sequelize")
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT
const fs = require('fs');
const rdsCa = fs.readFileSync(__dirname + '/config/amazon-rds-ca-cert.pem');

app.use(bodyParser.json());

console.log("database: ", process.env.DATABASE)
console.log("database url: ", process.env.DATABASE_URL)
console.log("user: ", process.env.DATABASE_USER)
console.log("pass: ", process.env.DATABASE_PASS)

/** Setup */
// const sequelize = new Sequelize(process.env.DATABASE_URL, {})
sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
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


/** Employee endpoints */
const Employee = sequelize.define("Employee", {
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
app.get('/api/employees', (req, res) => {
    Employee.findAll()
    .then(employees => {
        res.json(employees)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post("/api/employees", (req, res) => {
    Employee.create(req.body)
    .then(() => {
        Employee.findAll()
        .then(employees => {
            res.json(employees)
        })
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/api/employees/:id', (req, res) => {
    Employee.findOne({
        where: {
            EMPLOYEE_ID: req.params.id
        }
    })
    .then(employees => {
        res.json(employees)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/api/employees/:id', (req, res) => {
    Employee.update({...req.body},
        {
        where: {
            EMPLOYEE_ID: req.params.id
        }
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.delete('/api/employees/:id', (req, res) => {
    Employee.destroy({
        where: {
            EMPLOYEE_ID: req.params.id
        }
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

/** Shift end points */
const Shift = sequelize.define("Shift", {
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
app.get('/api/shifts', (req, res) => {
    Shift.findAll()
    .then(shifts => {
        res.json(shifts)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post("/api/shifts", (req,  res) => {
    Shift.create(req.body)
    .then(() => {
        res.status(200).send("Done")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/api/shifts/:id', (req, res) => {
    Shift.findOne({
        where: {
            SHIFT_ID: req.params.id
        }
    })
    .then(shift => {
        res.json(shift)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/api/shifts/:id', (req, res) => {
    Shift.update({...req.body},
        {
        where: {
            SHIFT_ID: req.params.id
        }
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

/** Schedule end points */
const Schedule = sequelize.define("Schedule", {
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
app.get('/api/schedules', (req, res) => {
    Schedule.findAll()
    .then(schedules => {
        res.json(schedules)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post("/api/schedules", (req,  res) => {
    Schedule.create(req.body)
    .then(() => {
        res.status(200).send("Done")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/api/schedules/:id', (req, res) => {
    Schedule.findOne({
        where: {
            SCHEDULE_ID: req.params.id
        }
    })
    .then(schedule => {
        res.json(schedule)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/api/schedules/:id', (req, res) => {
    Schedule.update({...req.body},
        {
        where: {
            SCHEDULE_ID: req.params.id
        }
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

/** Availability end points */
const EmployeeAvailability = sequelize.define("EmployeeAvailability", {
    EMPLOYEE_ID: Sequelize.INTEGER,
    START_TIME: Sequelize.DATE,
    END_TIME: Sequelize.DATE
}, {
    tableName: "EMPLOYEE_AVAILABILITY",
    timestamps: false
})
app.get('/api/availability', (req, res) => {
    EmployeeAvailability.findAll()
    .then(availability => {
        res.json(availability)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post("/api/availability", (req,  res) => {
    EmployeeAvailability.create(req.body)
    .then(() => {
        res.status(200).send("Done")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/api/availability/:employeeId', (req, res) => {
    EmployeeAvailability.findAll({
        where: {
            EMPLOYEE_ID: req.params.employeeId
        }
    })
    .then(availability => {
        res.json(availability)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/api/availability/:id', (req, res) => {
    EmployeeAvailability.update({...req.body},
        {
        where: {
            ID: req.params.id
        }
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

/** React */
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/** Listener */
app.listen(port, () => console.log(`Listening on port ${port}.`))

module.exports = app;