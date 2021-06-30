const cron = require('cron').CronJob;
const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolio');
const axios = require('axios');
const currentDate = require('./date')();  //current date in string form
module.exports = function() {
    //function will need to 
    //find all portfolio documents 
        //for each portfolio
        //calculate the current portfolio value 
        //if pastData is empty add 0's for past 13 days 
        //push to end of pastData 

    var job = new cron('* * * * *', async function() {
        //fetch current coin prices 
        let coinList; 
        try {
            coinList = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',)
            .then(function (response) {
                let coinInfo = [];
                response.data.forEach(coin => {
                    let currentCoin = {
                        id: coin.id,
                        symbol: coin.symbol,
                        name: coin.name,
                        image: coin.image,
                        current_price: coin.current_price
                    }
                    coinInfo.push(currentCoin);
                })
                return coinInfo;
            });
        } catch (error) {
            console.log(error);
        }
        
        try {
            const portfolios = await Portfolio.find();
            portfolios.forEach(portfolio => {
                //find currentPortfolio's value
                let currentProfolioValue;
                if(portfolio.presentData){
            let currentPortfolio= portfolio.presentData.coinData;
            //map over portfolio to gather current coin ids and their amounts
            let idsAndAmounts = [];
            currentPortfolio.forEach(coin =>{
                idsAndAmounts.push({ 
                    id: coin.id,
                    currentAmount: coin.currentAmount
                })
            })
            
            //find current price by id and multiply by amount, return values to an array
            let values= [];
            idsAndAmounts.forEach(coin => {
                const found = coinList.find(obj =>{
                return obj.id === coin.id;
                })
                if(found){
                const price = found.current_price;
                values.push(price * coin.currentAmount);
                }
            })
            //reduce values array for total portfolio value
            let totalValue = values.reduce((acc, currentValue) => acc + currentValue);
            currentProfolioValue = totalValue.toFixed(2);

               
                if(portfolio.pastData) {
                    //portfolio already has pastData
                    //Add current Porfolio's value to end of array
                    async function updateExisting() {
                        try {
                            const newData =  {
                                $push:{
                                        "pastData":{
                                            coinData:portfolio.presentData.coinData,
                                            Date: currentDate,
                                            portfolioValue: currentProfolioValue
                                        } 
                                } 
                                }
        
                            let userId = portfolio._user;
                            const existingPortfolio = await Portfolio.findOneAndUpdate({ _user: userId },newData)
                            await existingPortfolio.save();
                            
                        } catch (error) {
                            console.log('Error in update existing portfolio: ' + error)
                        }
                    }
                    updateExisting();
                    
                } else {
                    //if this is the first date of the portfolio
                    //add 14 zero days 
                    let pastDataPrefill = []
                        for(let i= 14; i > 0; i--){
                        let d = new Date();
                        d.setDate(d.getDate()-i)
                        pastDataPrefill.push({
                            coinData: '',
                            Date:d.toLocaleDateString(),
                            portfolioValue: '0'
                        })
                        }
                    //add current date and value to end of array
                    pastDataPrefill.push({
                        coinData:portfolio.presentData.coinData,
                        Date: currentDate,
                        portfolioValue: currentProfolioValue
                    });
                    portfolio.pastData = pastDataPrefill;
                    portfolio.save();

                }
                   
                }
                
            });
            console.log('Migration completed');
        } catch (error) {
            console.log(error);
        }
      }, null, true, 'America/Los_Angeles');
      job.start();
}


//timer 1 1 * * *  (1:01 am)

