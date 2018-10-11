const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const apiRouter = require('./routers/apiRouter/index');
const path = require('path');
const http = require('http');
const socketIO = require('./socket');
const { mongoDbURL } = require('./configs/keys');

const app = express();
const server = http.createServer(app);

global.rootDirName = path.resolve(__dirname);

mongoose.connect(mongoDbURL , { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    else console.log('Connect to mongodb');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(logger('dev'));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

socketIO(server);

server.listen(5000, () => {
    console.log('Listening on port 5000');
});