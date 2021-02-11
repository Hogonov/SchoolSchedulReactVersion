const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    school: {type: String, required: true},
    image: {type: String, required: false}
});

module.exports = model('Director', schema);
