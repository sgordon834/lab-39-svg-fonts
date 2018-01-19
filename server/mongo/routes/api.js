'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const requireDir = require('require-dir');

const models = requireDir(__dirname + '/../models/');

const apiRouter = module.exports = express.Router();

apiRouter.get('/test', (req, res, next) => {
    console.log('WORK PLEASE');
    res.end();
})

apiRouter.get('/api/:model', (req,res,next) => {

    try {

        let model = getModel(req);

        model.find({})
            .then( records => res.send(records) )
            .catch(next);


    }
    catch(e) {
        next(e.message);
    }

});

apiRouter.get('/api/:model/:id', (req,res,next) => {

    try {

        let model = getModel(req);
        let id = req.params.id;

        model.findOne({_id:id})
            .then( record => res.send(record) )
            .catch(next);

    }
    catch(e) {
        next(e.message);
    }

});


apiRouter.post('/api/:model', jsonParser, (req,res,next) => {
console.log('POST ROUTE')
    try {

        let model = getModel(req);

        let newRecord = new model(req.body);

        newRecord.save()
               .then(record => res.send(record) )
               .catch(err => next(err));

    }
    catch(e) {
        next(e.message);
    }

});


apiRouter.put('/api/:model/:id', jsonParser, (req,res,next) => {

    try {

        let model = getModel(req);
        let id = req.params.id;

        model.findOne({_id:id})
            .then( record => {
                Object.assign(record, req.body);
                return record.save();
            })
            .then( record => res.send(record) )
            .catch(next);

    }
    catch(e) {
        next(e.message);
    }

});


apiRouter.delete('/api/:model/:id', (req,res,next) => {

    try {

        let model = getModel(req);
        let id = req.params.id;

        model.remove({_id:id})
            .then( () => res.send("Record Deleted Successfully") )
            .catch({statusCode:500,message:"Please try again"})

    }
    catch(e) {
        next(e.message);
    }

});

// UTIL FUNCTIONS //
let getModel = (req, next) => {

    if ( req.params.model && models[req.params.model] ) {
       return models[req.params.model];
    }

    throw new Error("Invalid Model Specified: " + req.params.model);


};
