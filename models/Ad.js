const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    school: {type: String, required: true},
    image: {type: String, required: false}
});

module.exports = model('Ad', schema);
