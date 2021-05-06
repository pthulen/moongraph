const mongoose =require('mongoose');

const { Schema } = mongoose;

//Schema for storing User data in DB
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

//Makes Schema available to use as 'user'
mongoose.model('users', userSchema);
