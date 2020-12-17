const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    courses: [{
            time1: String, time2: String, time3: String,
            name1: String, name2: String, name3: String,
            day: String
        }],
    school: {type: String, required: true}
});

module.exports = model('SpecialCourse', schema);
