const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    time: {firstSession: [], secondSession: []},
    school: {type: String, required: true, default: 'DNOPE'},
    special: {firstSpecialSession: [], secondSpecialSession: [], dates: []}
});

module.exports = model('Time', schema);

