const express = require("express")
const app = express()
const Sequelize = require("sequelize")
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000


app.use(bodyParser.json());

const sequelize = require("./database/createDatabase")()

/** Set up models/schemas */
const Employee = require("./database/model/employee")(sequelize)
const Shift = require("./database/model/shift")(sequelize)
const Schedule = require("./database/model/schedule")(sequelize)
const EmployeeAvailability = require("./database/model/employeeAvailability")(sequelize)

require("./routes/employees")(app, Employee)
require("./routes/shifts")(app, Shift)
require("./routes/schedules")(app, Schedule)
require("./routes/availability")(app, EmployeeAvailability)

/** React */
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/** Listener */
app.listen(port, () => console.log(`Listening on port ${port}.`))


//display active routes
app._router.stack
  .filter(r => r.route)
  .map(r => r.route)
  .forEach(it => {
        it.stack.forEach(s => console.log(s.method.padEnd(8, " "), it.path))
  })

module.exports = app;