const mongoose = require('mongoose');
const {Schema} = mongoose;

const buySchema = new Schema({
    price: int,
});

const BuyModel = mongoose.model('BuyMod', buySchema);

module.exports = BuyModel;