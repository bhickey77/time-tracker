const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText =    'SELECT project.id, project.project_name FROM project';
    pool.query(queryText)
        .then(function(response){
            console.log('back from the db with: ', response);
            res.send(response.rows)
        }).catch(function(error){
            console.log('back from the db with: ', error);
            res.sendStatus(500);
        });
});

module.exports = router;