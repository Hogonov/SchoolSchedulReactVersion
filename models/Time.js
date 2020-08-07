const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    time: [{type: String, required: true}],
    session: {type: String, required: true},
    school: {type: String, required: true, default: 'DNOPE'},
    special: {type: String, required: false}
});

module.exports = model('Time', schema);
