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

const port = process.env.PORT || 5000;

global.rootDirName = path.resolve(__dirname);

mongoose.connect('mongodb://root:ntn223@ds115963.mlab.com:15963/compnet1', {
            useNewUrlParser: true
        }, (err) => {
    if (err) throw err;
    else console.log('Connect to mongodb');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(logger('dev'));

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

socketIO(server);

server.listen(port, () => {
    console.log('Listening on port', port);
});