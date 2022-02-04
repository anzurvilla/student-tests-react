'use strict';

const Test = require('../models/test');

module.exports = {

    // Find all the Tests
    get: async (req,res,next) => {
        try {
            // Find all the stored Tests from the Database
            const stored = await Test.scope('datagrid').findAll();
            if(stored) return res.json(stored);
            else res.status(204).json({message: 'Tests not found'});
        } catch (err) {
            next(err);
        }
    },

    // Update one Test
    put: async (req,res,next) => {
        try {
            // Validate params
            if(!req.params.id) res.status(400).json({error: `Missing ID`});
            else if(!req.body) res.status(400).json({error: `Missing body`});
            else if(!req.body.score) res.status(400).json({error: `Missing score`});
            else {
                // Update the Test with the params data validated
                const updated = await Test.update(
                    { score: req.body.score },
                    { where: {id: req.params.id} }
                );
                if(updated) return res.json({message: `Test updated successfully`});
                else res.status(204).json({message: 'Test not updated'});
            }
        } catch (err) {
            next(err);
        }
    },

}