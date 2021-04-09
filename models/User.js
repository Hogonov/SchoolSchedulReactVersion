const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: "ROLE_USER"},
    school: {type: String, required: true, ref: 'School', default: "NOPE"},
});

module.exports = model('User', schema);
