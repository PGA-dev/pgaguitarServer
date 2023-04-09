const express = require('express');
const Link = require('../models/link');

const linksRouter = express.Router();


//Link
linksRouter.route('/')
.get((req, res, next) => {
    Link.find()
    .then(link => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Link.create(req.body)
    .then(link => {
        console.log('link entry POST ', link);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /links');
})
.delete((req, res, next) => {
    Link.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//seeder for database initial upload
linksRouter.route('/:many')
.post((req, res, next) => {
    Link.insertMany(req.body)
    .then(link => {
        console.log('link entry POST ', link);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    })
    .catch(err => next(err));
})
//Get and edits for individual links
linksRouter.route('/:linkId')
.get((req, res, next) => {
    Link.findById(req.params.linkId)
    .then(link => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /links/${req.params.linkId}`);
})
.put((req, res, next) => {
    Link.findByIdAndUpdate(req.params.linkId, {
        $set: req.body
    }, { new: true })
    .then(link => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Link.findByIdAndDelete(req.params.linkId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

                                                                                         
module.exports = linksRouter;