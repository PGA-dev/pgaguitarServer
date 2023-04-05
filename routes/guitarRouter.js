const express = require('express');
const Guitar = require('../models/guitar');

const guitarRouter = express.Router();

//not finished -- must update for guitarstats before -- may merge guitar and guitardetail for one big http nightmare


//guitar routing for Guitar Directory Page
guitarRouter.route('/')
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
})
.delete((req, res, next) => {
    Guitar.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//guitar Id for Guitar Detail Page
guitarRouter.route('/:guitarId')
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

//guitarstat
guitarRouter.route('/:guitarId/guitarstat')
.get((req, res, next) => {
    Guitar.findById(req.params.guitarId)
    .then(guitar => {
        if (guitar) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(guitar.guitarstat);
        } else {
            err = new Error(`Guitar ${req.params.guitarId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Guitar.findById(req.params.guitarId)
    .then(guitar => {
        if (guitar) {
            guitar.guitarstat.push(req.body);
            guitar.save()
            .then(guitar => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(guitar);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`guitar ${req.params.guitarId} data not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /guitar/${req.params.guitarId}/stats`);
})
.delete((req, res, next) => {
    Guitar.findById(req.params.guitarId)
    .then(guitar => {
        if (guitar) {
            for (let i = (guitar.guitarstat.length-1); i >= 0; i--) {
                guitar.guitarstat.id(guitar.guitarstat[i]._id).remove();
            }
            guitar.save()
            .then(guitar => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(guitar);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`guitar ${req.params.guitarId} data not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

guitarRouter.route('/:guitarId/guitarstat/guitarstat2')

guitarRouter.route('/:guitarId/guitarstat/guitarstat2/guitarstat3')

guitarRouter.route('/:guitarId/guitarstat/guitarstat2/guitarstat3/guitarstat4')

guitarRouter.route('/:guitarId/guitarstat/guitarstat2/guitarstat3/guitarstat4/guitarstat5')




module.exports = guitarRouter;