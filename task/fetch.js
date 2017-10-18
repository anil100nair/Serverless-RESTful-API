'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const tasksModel = require('../model/tasks');
const dbInstance = new dbAccess();

module.exports.findAllTasks = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  dbInstance.connectDB().then(() => {
    tasksModel.find({ taskUser: event.pathParameters.userId }, (err, tasks) => {
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
      console.log('Found All Tasks');
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "All Tasks Found",
          data: tasks,
          input: event,
        }),
      };
      callback(null, response);
    });
  });    
};

module.exports.findOneTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  dbInstance.connectDB().then(() => {
    tasksModel.findById( event.pathParameters.taskId, (err, task) => {
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
      console.log('Found Task.');
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Task found.",
          data: task,
          input: event,
        }),
      };
      callback(null, response);
    });
  });    
};  