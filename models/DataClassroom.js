const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    classes: [String],
    checkedArr: [[Boolean]],
    school: {type: String, ref: 'School', required: true}
});

module.exports = model('DataClassroom', schema);
