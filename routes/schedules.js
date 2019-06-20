module.exports = (app, Schedule) => {
    app.get('/api/schedules', (req, res) => {
        routerFunctions.findAll(Schedule, req, res)
    })
    
    app.post("/api/schedules", (req, res) => {
        routerFunctions.create(Schedule, req, res)
    })
    
    app.get('/api/schedules/:id', (req, res) => {
        routerFunctions.findOne(Schedule, {
            SCHEDULE_ID: req.params.id
        }, req, res)
    })
    
    app.post('/api/schedules/:id', (req, res) => {
        routerFunctions.update(Schedule, {
            SCHEDULE_ID: req.params.id
        }, req, res)
    })
    
    app.delete('/api/schedules/:id', (req, res) => {
        routerFunctions.destroy(Schedule, {
            SCHEDULE_ID: req.params.id
        }, req, res)
    })
}