const routerFunctions = require("./routerFunctions")

module.exports = (app, Employee) => {
    app.get('/api/employees', (req, res) => {
        routerFunctions.findAll(Employee, req, res)
    })
    
    app.post("/api/employees", (req, res) => {
        routerFunctions.create(Employee, req, res)
    })
    
    app.get('/api/employees/:id', (req, res) => {
        routerFunctions.findOne(Employee, {
            EMPLOYEE_ID: req.params.id
        }, req, res)
    })
    
    app.post('/api/employees/:id', (req, res) => {
        routerFunctions.update(Employee, {
            EMPLOYEE_ID: req.params.id
        }, req, res)
    })
    
    app.delete('/api/employees/:id', (req, res) => {
        routerFunctions.destroy(Employee, {
            EMPLOYEE_ID: req.params.id
        }, req, res)
    })
}