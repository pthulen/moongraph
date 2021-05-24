const axios = require('axios');
const { Mongoose } = require('mongoose');

const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolio');
const Coin = mongoose.model('coin');

module.exports = (app) => {

    //get portfolio of current user
    app.get('/api/portfolio', async (req, res) => {

        try {
            const portfolio = await Portfolio.find({ _user: req.user.id });
            res.status(200).send(portfolio);
        } catch (error) {
            res.send(error);
        }
    });

    //creates portfolio with initial coin
    app.post('/api/portfolio', async (req,res) => {
        const { date, id, name, amount } = req.body; 
        
        const portfolio = new Portfolio({
            _user: req.user.id,
            presentData: {
                date,
                coinData: {
                    id,
                    name,
                    currentAmount: amount,
                    currentPrice: 0,
                    currentValue: 0
                }
            }
        })

        try {
            await portfolio.save();
            res.send(portfolio);
            
        } catch (err) {
            res.status(400).send(err);
        }
    });
    //adds new coin/asset to portfolio, should always initialize with zero amount
    app.put('/api/portfolio', async (req, res) => {
        const { id, name, amount } = req.body;
        const newCoin =  {
            $push:{
                    "presentData.coinData":{
                        id,
                        name,
                        currentAmount: amount,
                        currentPrice: 0,
                        currentValue: 0
                    } 
            } 
            }
        //add coin to presentData -> coinData array
        //portfolio[0].presentData.coinData.push(newCoin);
        try {
            //access current user's portfolio
            const portfolio = await Portfolio.findOneAndUpdate({ _user: req.user.id },newCoin)
            await portfolio.save();
            
            const updatedPortfolio = await Portfolio.find({ _user: req.user.id });
            res.send(updatedPortfolio);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });

    //route for updating value of an existing coin/asset
    app.put('/api/portfolio/:id', async (req, res) => {
        const { id, amount, currentPrice, currentValue } = req.body;
        try {
        // access current user's portfolio
       const portfolio = await Portfolio.findOne({ _user: req.user.id });       
        //find coin index by Id
        let index = portfolio.presentData.coinData.findIndex(function(coin) {
            return coin.id == id
        })
         //update amount, market price, and value of asset held
        portfolio.presentData.coinData[index].currentAmount = amount;
        portfolio.presentData.coinData[index].currentPrice = currentPrice;
        portfolio.presentData.coinData[index].currentValue = currentValue;
        portfolio.markModified('presentData.coinData');
        await portfolio.save();
        res.send(portfolio);
        } catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
        
    

    });

}