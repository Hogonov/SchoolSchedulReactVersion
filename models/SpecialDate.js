const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    date: {type: Date, required: true},
    school:{type: String, required: true},
    quarter: {type: String}
});

module.exports = model('SpecialDate', schema);
