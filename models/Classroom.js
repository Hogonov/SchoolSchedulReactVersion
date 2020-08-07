const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    session: {type: String, required: true},
    subjects: [{name: String, time: String}],
    school: {type: String, required: true},
    day: {type: String, required: true}
});

module.exports = model('Classroom', schema);
