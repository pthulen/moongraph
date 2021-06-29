const axios = require('axios');

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

   
}