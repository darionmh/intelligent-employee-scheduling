function findAll(Model, req, res, where = {}){
    Model.findAll({where})
    .then(value => {
        res.json(value)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

function create(Model, req, res){
    Model.create(req.body)
    .then(() => {
        Model.findAll()
        .then(value => {
            res.json(value)
        })
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

function findOne(Model, where, req, res){
    Model.findOne({
        where
    })
    .then(value => {
        res.json(value)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

function update(Model, where, req, res){
    Model.update({...req.body},{
        where
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

function destroy(Model, where, req, res){
    Model.destroy({
        where
    })
    .then(updated => {
        res.status(200).send(updated)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.update = update
module.exports.create = create
module.exports.destroy = destroy