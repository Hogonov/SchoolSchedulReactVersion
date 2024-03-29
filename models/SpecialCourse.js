const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    courses: [{
        day: String,
        course: [{index: Number, name: String, time: String}]
    }],
    school: {type: String, ref: 'School', required: true}
});

module.exports = model('SpecialCourse', schema);
