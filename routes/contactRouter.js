const express = require('express');
const Contact = require('../models/contact');
const cors = require('./cors');

const contactRouter = express.Router();


//guitar routing for Guitar Directory Page
contactRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Contact.find()
    .then(contact => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Contact.create(req.body)
    .then(contact => {
        console.log('contact entry POST ', contact);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contact');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Contact.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//guitar Id for Guitar Detail Page
contactRouter.route('/:contactId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Contact.findById(req.params.contactId)
    .then(contact => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /contact/${req.params.contactId}`);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.contactId, {
        $set: req.body
    }, { new: true })
    .then(contact => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Contact.findByIdAndDelete(req.params.contactId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

                                                                                         
module.exports = contactRouter;