const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    classrooms: [{type: Types.ObjectId, ref: 'Classroom'}],
    session: {type: Boolean, required: true}
});

module.exports = model('Table', schema);
