const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    task: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    },
    taskUser: {
        type: String,
        require: true
    }
});

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;