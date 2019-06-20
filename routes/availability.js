const routerFunctions = require("./routerFunctions")

module.exports = (app, EmployeeAvailability) => {
    app.get('/api/availability', (req, res) => {
        routerFunctions.findAll(EmployeeAvailability, req, res)
    })
    
    app.post("/api/availability", (req,  res) => {
        routerFunctions.create(EmployeeAvailability, req, res)
    })
    
    app.get('/api/availability/:employeeId', (req, res) => {
        routerFunctions.findAll(EmployeeAvailability, req, res, {EMPLOYEE_ID: req.params.employeeId})
    })
    
    app.post('/api/availability/:id', (req, res) => {
        routerFunctions.update(EmployeeAvailability, {ID: req.params.id}, req, res)
    })
    
    app.delete('/api/availability/:id', (req, res) => {
        routerFunctions.destroy(EmployeeAvailability, {
            ID: req.params.id
        }, req, res)
    })
}