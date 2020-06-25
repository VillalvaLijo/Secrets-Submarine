const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require ('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    //console.log(req.user.clearance_level);
    //res.send(req.user);
    if(req.user.clearance_level >= 13){
        console.log(req.user.clearance_level);
        pool.query(`SELECT * FROM "secret";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else if(req.user.clearance_level >= 6){
        console.log(req.clearance_level);
        pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" <= 6;`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else if(req.user.clearance_level >=3){
        console.log(req.clearance_level);
        pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" <=3;`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
    });

module.exports = router;