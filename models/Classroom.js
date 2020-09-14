const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    session: {type: String, required: true},
    subjects: [{name: String, time: String, office: String,update: Boolean}],
    school: {type: String, required: true},
    day: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = model('Classroom', schema);
