let verbose = false;

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    let entry = req.body;
    verbose && console.log('handling POST for /entry', req);
    let queryText =    `INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds)
                        VALUES ($1, $2, $3)
                        RETURNING entry.id;`
    pool.query(queryText, 
            [entry.item, entry.entryDateMilliFromEpoch, entry.milliseconds])
        .then(function(response){
            verbose && console.log('successfully inserted into db: ', response.rows[0].id);
            let entry_id = response.rows[0].id;
            let junctionQuery =     `INSERT INTO entry_project (entry_id, project_id) 
                                     VALUES ($1,$2);`
            pool.query(junctionQuery,
                    [entry_id, entry.project_id])
                .then(function(response){
                    verbose && console.log('successfully inserted into db: ', response);
                    res.sendStatus(200);
                }).catch(function(error){
                    verbose && console.log('error posting to the db: ', error);
                    res.sendStatus(500);
                })
        }).catch(function(error){
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    verbose && console.log('deleting for /entry: ', req.params.id);    
    let id = req.params.id;
    let queryText =     `DELETE FROM entry
                         WHERE id = $1;`
    pool.query(queryText, 
                [id])
        .then(function(response){
            verbose && console.log('successfully deleted from db: ', response);
            res.sendStatus(200);
        }).catch(function(error){
            verbose && console.log('error deleting from the db: ', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    verbose && console.log('handling GET for /entry');
    let queryText =    `SELECT entry.id, entry.item, entry.item_date_milli_from_epoch, entry.entry_time_milliseconds, project.project_name FROM entry_project
                        JOIN entry ON entry.id = entry_project.entry_id
                        JOIN project ON project.id = entry_project.project_id
                        GROUP BY entry.id, project.project_name ORDER BY entry.item_date_milli_from_epoch DESC;`
    pool.query(queryText)
        .then(function(response){
            verbose && console.log('back from the db with: ', response.rows);
            res.send(response.rows);
        }).catch(function(error){
            verbose && console.log('error with the db: ', error);
            res.sendStatus(500);
        })
});

module.exports = router;