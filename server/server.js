let verbose = false;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

const entry = require('./routes/entry.router');
const project = require('./routes//project.router');
app.use('/entry', entry);
app.use('/project', project)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    verbose && console.log('listening on port', port);  
});