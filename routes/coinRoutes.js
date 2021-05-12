const axios = require('axios');
const { Mongoose } = require('mongoose');

const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolio');
const Coin = mongoose.model('coin');

module.exports = (app) => {

    //get list of supported coins and their IDs, name, logo and price
    app.get('/api/coins', async (req, res) => {

        try {
            let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',)
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
            res.status(200).send(response);
        } catch (error) {
            res.send(error);
        }
    })

    //get current price of coin by ID. Will be used to regularly pull updated prices
    app.get('/api/coins/prices/', async (req, res) => {
        try {
            console.log(req.body)
            //build correct url from requested coins
            let urlBase = 'https://api.coingecko.com/api/v3/simple/price?ids=';
            let urlEnd = '&vs_currencies=usd'
            //this array will be filled with data from the request
            const coinsToFetch = ['bitcoin', 'algorand', 'ethereum'];
            for(let i=1; i<coinsToFetch.length; i++){
                coinsToFetch[i] = '%2C'+coinsToFetch[i];
            }
            const coinString =coinsToFetch.join('');
            let url = urlBase + coinString + urlEnd
            console.log(url);
            let response = await axios.get(url,)
            .then(function (response) {
                let prices = [response.data];
                return prices;
            });
            res.send(response);
        } catch (error) {
            res.send(error);
        }
    })

    //get portfolio of current user
    app.get('/api/portfolio', async (req, res) => {

        try {
            const portfolio = await Portfolio.find({ _user: req.user.id });
            res.status(200).send(portfolio);
        } catch (error) {
            res.send(error);
        }
    });

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

        // const coinSchema = new Schema({
        //     id: String,
        //     symbol: String,
        //     name: String,
        //     image: String,
        //     currentPrice: Number,
        //     currentAmount: Number,
        //     currentValue: Number
        // });

        try {
            await portfolio.save();
            res.send(portfolio);
            
        } catch (err) {
            res.status(400).send(err);
        }
    });
}