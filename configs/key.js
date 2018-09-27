module.exports = {
    mongoDbURL: process.NODE_ENV === 'production' ? 'mongodb://root:computenetwork1@ds115963.mlab.com:15963/compnet1' : 'mongodb://localhost/chat_app'
}