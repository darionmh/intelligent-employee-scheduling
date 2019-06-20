module.exports = (app, Shift) => {
    app.get('/api/shifts', (req, res) => {
        routerFunctions.findAll(Shift, req, res)
    })
    
    app.post("/api/shifts", (req, res) => {
        routerFunctions.create(Shift, req, res)
    })
    
    app.get('/api/shifts/:id', (req, res) => {
        routerFunctions.findOne(Shift, {
            SHIFT_ID: req.params.id
        }, req, res)
    })
    
    app.post('/api/shifts/:id', (req, res) => {
        routerFunctions.update(Shift, {
            SHIFT_ID: req.params.id
        }, req, res)
    })
    
    app.delete('/api/shifts/:id', (req, res) => {
        routerFunctions.destroy(Shift, {
            SHIFT_ID: req.params.id
        }, req, res)
    })
}