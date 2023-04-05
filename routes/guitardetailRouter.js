const express = require('express');
const Guitar = require('../models/guitar');

const guitardetailRouter = express.Router();
//not finished -- must update for guitarstats before -- may merge guitar and guitardetail for one big http nightmare

//Basic campsite routing
guitardetailRouter.route('/')
.get((req, res, next) => {
    Guitar.find()
    .then(guitar => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(guitar);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Guitar.create(req.body)
    .then(guitar => {
        console.log('Guitar entry POST ', guitar);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(guitar);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /guitar');
})//will be updated for support
.delete((req, res, next) => {
    Guitar.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//campsite:Id routing
guitardetailRouter.route('/:guitarId')
.get((req, res, next) => {
    Guitar.findById(req.params.guitarId)
    .then(guitar => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(guitar);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /guitar/${req.params.guitarId}`);
})
.put((req, res, next) => {
    Guitar.findByIdAndUpdate(req.params.guitarId, {
        $set: req.body
    }, { new: true })
    .then(guitar => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(guitar);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Guitar.findByIdAndDelete(req.params.guitarId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = guitarRouter;