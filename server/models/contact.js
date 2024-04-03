const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    name: String,
    email: {
        type: String
    },
    message: String,
});

const ContactModel = mongoose.model('ContactMod', contactSchema);

module.exports = ContactModel;