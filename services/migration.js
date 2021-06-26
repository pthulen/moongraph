const cron = require('cron').CronJob;
// const keys = require('../config/keys');
const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolio');
module.exports = function() {
    //function will need to 
    //find all portfolio documents 
        //for each portfolio
        //if pastData is empty add 0's for past 13 days 
        //calculate the current portfolio value 
        //push to end of pastData 

    var job = new cron('* * * * * ', async function() {
        console.log('You will see this message every minute');
        try {
            const portfolio = await Portfolio.find();
            console.log(portfolio)
            //res.status(200).send(portfolio);
        } catch (error) {
            console.log(error);
        }
      }, null, true, 'America/Los_Angeles');
      job.start();
}


//timer 1 1 * * *  (1:01 am)