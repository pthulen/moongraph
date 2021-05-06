
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    //currently in development
    module.exports = require('./dev');
}