const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    school: {type: String, required: true},
    days: [{
        day: {value: String, label: String, name: String, index: Number},
        session: {value: String, label: String, name: String, time: [String]},
        subjects: [{
            index: Number,
            name: String,
            time: String,
            office: String,
            update: Boolean
        }]
    }]
});

module.exports = model('Classroom', schema);
