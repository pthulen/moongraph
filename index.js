const express = require('express');
const { send } = require('process');

const app = express();

app.get('/', (req, res)=>{
    res.send('hello');
});

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