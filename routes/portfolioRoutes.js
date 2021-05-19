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
        console.log(req.body);
        const { date, id, amount } = req.body; 
        
        const portfolio = new Portfolio({
            _user: req.user.id,
            presentData: {
                date,
                coinData: {
                    id,
                    currentAmount: amount
                }
            }
        })

        try {
            await portfolio.save();
            console.log(`Portfolio created: ${portfolio}`);
            res.send(portfolio);
            
        } catch (err) {
            res.status(400).send(err);
        }
    });
    //adds new coin/asset to portfolio, should always initialize with zero amount
    app.put('/api/portfolio', async (req, res) => {
        const { id, amount } = req.body;
        const newCoin =  {
            $push:{
                    "presentData.coinData":{
                        id,
                        currentAmount: amount
                    } 
            } 
            }
        //access current user's portfolio
        //add coin to presentData -> coinData array
        //portfolio[0].presentData.coinData.push(newCoin);
        try {
            const portfolio = await Portfolio.findOneAndUpdate({ _user: req.user.id },newCoin)
            await portfolio.save();
            
            const updatedPortfolio = await Portfolio.find({ _user: req.user.id });
            console.log(`Updated portfolio: ${updatedPortfolio}`);
            console.log(`Portfolio coin added: ${JSON.stringify(updatedPortfolio.presentData)}`);
            res.send(updatedPortfolio);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });

    //route for updating value of an existing coin/asset
    app.put('/api/portfolio/:id', async (req, res) => {
        const { id, amount } = req.body;
        console.log(`id: 4${id}, amount: ${amount}`)
       // access current user's portfolio
       //const portfolio = await Portfolio.find({ _user: req.user.id });

        //find coin by Id
        //update value
    

    });

}