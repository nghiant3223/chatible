const mongoose = require('mongoose');
const { mongoDbURL } = require('../configs/keys');

mongoose.connect(mongoDbURL, {
    useNewUrlParser: true
}, (err) => {
    if (err) throw err;
    else console.log('Connect to mongodb');
});