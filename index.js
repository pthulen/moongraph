const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//require models for DB

//require passport js for Oauth
require('./services/passport');

//connect to mongoDb with 
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/coinRoutes')(app);

if (process.env.NODE_ENV === "production") {
    // express will serve up production assets
    app.use(express.static('client/build'));

    //serves index.html for unknown routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); 
} 

const PORT = process.env.PORT || 5000;
console.log(`App listening on ${PORT}`)
app.listen(PORT);

module.exports = app //for testing