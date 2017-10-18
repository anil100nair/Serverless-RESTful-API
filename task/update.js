'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const tasksModel = require('../model/tasks');
const dbInstance = new dbAccess();

module.exports.editTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  event.body = JSON.parse(event.body);

  dbInstance.connectDB().then(() => {
    tasksModel.findById(event.pathParameters.taskId, (err, task) => {
      if (err) {
        console.log(err);
        const response = {
          statusCode: 404,
          body: JSON.stringify({
            message: err.message,
            input: event,
          }),
        };
        callback(null, response);
      }
      console.log('Found the task.');
      task.task = event.body.task || task.task;
      task.isDone = event.body.isDone || task.isDone;
      task.taskUser = event.body.taskUser || task.taskUser;
      tasksModel.findByIdAndUpdate(event.pathParameters.taskId, task, (err, updatedTask) => {
        if (err) {
          const response = {
            statusCode: 400,
            body: JSON.stringify({
              message: err.message,
              input: event,
            }),
          };
          callback(null, response);
        }
        const response = {
          statusCode: 201,
          body: JSON.stringify({
            message: "User successfully updated.",
            data: task,
            input: event,
          }),
        };
        callback(null, response);
      });
    });
  });
    
};