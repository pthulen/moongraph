const mongoose = require('mongoose');
const { Schema } = mongoose;
const coinSchema = require('./coin');

const portfolioSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    presentData: {
        date: Number,
        portfolioValue: Number,
        coinData: [coinSchema]
    },
    pastData: {
        //create schema to collect daily portfolio data for balance history
    }
});

mongoose.model('portfolio', portfolioSchema);