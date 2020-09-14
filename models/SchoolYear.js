const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    school: {type: String, required: true},
    interval: {type: {start: Date, finish: Date}, required: true},
    quarter: [{name: String, start: Date, finish: Date}]
});

module.exports = model('SchoolYear', schema);
