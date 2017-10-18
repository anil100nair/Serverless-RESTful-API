'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const tasksModel = require('../model/tasks');
const dbInstance = new dbAccess();

module.exports.deleteTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  dbInstance.connectDB().then(() => {
    tasksModel.findByIdAndRemove(event.pathParameters.taskId, (err, task) => {
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
      console.log('Task Deleted.');
      usersModel.findById(event.pathParameters.userId, (err, user) => {
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
        const pos = user.tasks.indexOf(event.pathParameters.taskId);
        user.tasks.splice(pos, 1);
        usersModel.findByIdAndUpdate(event.pathParameters.userId, user, (err, updatedUser) => {
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
          console.log('User successfully updated.');
          const response = {
            statusCode: 201,
            body: JSON.stringify({
              message: "User successfully updated.",
              data: updatedUser,
              input: event,
            }),
          };
          callback(null, response);
        });
      });
    });
  });  
};