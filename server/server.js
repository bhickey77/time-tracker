const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const entry = require('./routes/entry.router');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/entry', entry);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on port', port);  
});