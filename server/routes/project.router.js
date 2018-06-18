let verbose = true;

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText =    `SELECT project.id, project.project_name, SUM(entry.entry_time_milliseconds) as total_entry_time_milliseconds FROM project
                        LEFT JOIN entry_project ON project.id = entry_project.project_id
                        LEFT JOIN entry ON entry.id = entry_project.entry_id
                        GROUP BY project.id;`
    pool.query(queryText)
        .then(function(response){
            verbose && console.log('back from the db with: ', response);
            res.send(response.rows)
        }).catch(function(error){
            verbose && console.log('back from the db with: ', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    verbose && console.log(req.body);
    let queryText =     `INSERT INTO project (project_name)
                         VALUES ($1)`;
    pool.query(queryText,
        [req.body.project_name])
        .then(function(response){
            verbose && console.log('successfully inserted into db: ', response);
            res.sendStatus(200);
        }).catch(function(error){
            verbose && console.log('')  
            res.sendStatus(500);
        });;
});

router.delete('/:id', (req, res) => {
    verbose && console.log('in delete project: ', req.params.id);
    let queryText =     `DELETE FROM project 
                         WHERE id = $1`;
    pool.query(queryText,
        [req.params.id])
        .then(function(response){
            verbose && console.log('successfully deleted from the db:  ', response);
            res.sendStatus(200);
        }).catch(function(error){
            verbose && console.log('error deleting from the db: ', error);
            res.sendStatus(500);
        });
});

module.exports = router;