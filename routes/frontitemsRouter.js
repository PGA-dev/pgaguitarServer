const express = require('express');
const FrontItems = require('../models/frontitems');
const cors = require('./cors');

const frontitemsRouter = express.Router();


//Link
frontitemsRouter.route('/')
.get(cors.cors, (req, res, next) => {
    FrontItems.find()
    .then(frontitems => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(frontitems);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    FrontItems.create(req.body)
    .then(frontitems => {
        console.log('frontitems Carousel entry POST ', frontitems);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(frontitems);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /frontitems');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    FrontItems.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//seeder for database initial upload
frontitemsRouter.route('/:many')
.post(cors.corsWithOptions, (req, res, next) => {
    FrontItems.insertMany(req.body)
    .then(frontitems => {
        console.log('link entry POST ', frontitems);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(frontitems);
    })
    .catch(err => next(err));
})
//Get and edits for individual links
frontitemsRouter.route('/:frontitemsId')
.get(cors.cors, (req, res, next) => {
    FrontItems.findById(req.params.frontitemsId)
    .then(frontitems => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(frontitems);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /frontitems/${req.params.frontitemsId}`);
})
.put(cors.corsWithOptions, (req, res, next) => {
    FrontItems.findByIdAndUpdate(req.params.frontitemsId, {
        $set: req.body
    }, { new: true })
    .then(frontitems => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(frontitems);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    FrontItems.findByIdAndDelete(req.params.frontitemsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

                                                                                         
module.exports = frontitemsRouter;