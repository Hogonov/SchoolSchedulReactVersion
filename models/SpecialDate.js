const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    date: {type: Date, required: true},
    school:{type: String, required: true}
});

module.exports = model('SpecialDate', schema);
