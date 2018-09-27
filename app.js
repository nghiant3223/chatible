const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const apiRouter = require('./routers/apiRouter/index');
const path = require('path');
const { mongoDbURL } = require('./configs/key');

const app = express();

global.rootDirName = path.resolve(__dirname);

mongoose.connect(mongoDbURL , { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    else console.log('Connect to mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(logger('dev'));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});