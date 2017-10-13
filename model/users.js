const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    tasks: {
        type: [String]
    }
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;