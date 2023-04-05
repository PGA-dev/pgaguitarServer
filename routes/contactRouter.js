const express = require('express');
const Contact = require('../models/contact');

const contactRouter = express.Router();

//not finished -- must update for guitarstats before -- may merge guitar and guitardetail for one big http nightmare


//guitar routing for Guitar Directory Page
contactRouter.route('/')
.get((req, res, next) => {
    Contact.find()
    .then(contact => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Contact.create(req.body)
    .then(contact => {
        console.log('contact entry POST ', contact);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contact');
})
.delete((req, res, next) => {
    Contact.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//guitar Id for Guitar Detail Page
contactRouter.route('/:guitarId')
.get((req, res, next) => {
    Contact.findById(req.params.contactId)
    .then(contact => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contact);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /contact/${req.params.contactId}`);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    Contact.findByIdAndDelete(req.params.contactId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

                                                                                         
module.exports = contactRouter;