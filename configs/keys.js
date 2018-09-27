const environment = process.NODE_ENV === 'production' ? require('./prodKeys')  : require('./devKeys');

module.exports =  {
    jwtSecret: '#)(#)$oiapjwefi',
    ...environment
}