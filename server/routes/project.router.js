let verbose = false;

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText =    `SELECT project.id, project.project_name, SUM(entry.entry_time_milliseconds) as total_entry_time_milliseconds FROM project
                        JOIN entry_project ON project.id = entry_project.project_id
                        JOIN entry ON entry.id = entry_project.entry_id
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

router.delete('/:id', (req, res) => {
    let queryText =     `DELETE FROM projects 
                         WHERE id = $1`;
    pool.query(queryText)
        .then(function(response){
            verbose && console.log('successfully deleted from the db:  ', response);
            
        }).catch(function(error){

        });
});

module.exports = router;