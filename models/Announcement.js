const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    school: {type: String, required: true},
    deleteDate: {type: Date, required: true, default: new Date().setMonth(new Date().getMonth() + 1)}
});

module.exports = model('Announcement', schema);
