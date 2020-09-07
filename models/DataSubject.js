const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    school: {type: String, required: true, default: 'DNOPE'}
});

module.exports = model('DataSubject', schema);
