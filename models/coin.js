const mongoose = require('mongoose');
const { Schema } = mongoose;

const coinSchema = new Schema({
    id: String,
    symbol: String,
    name: String,
    image: String,
    currentPrice: Number,
    currentAmount: Number,
    currentValue: Number
});

mongoose.model('coin', coinSchema);