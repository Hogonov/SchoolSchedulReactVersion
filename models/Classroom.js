const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    school: {type: String, ref: 'School', required: true},
    days: [{
        day: {value: String, label: String, name: String, index: Number},
        session: {value: String, label: String, name: String},
        subjects: [{
            index: Number,
            name: String,
            time: String,
            office: String,
            update: Boolean,
            date: {type: Date, required: false}
        }]
    }]
});

module.exports = model('Classroom', schema);
