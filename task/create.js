'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const tasksModel = require('../model/tasks');
const dbInstance = new dbAccess();

module.exports.createTask = (event, context, callback) => {

  // Preventing the Lambda from waiting for the Node event loop to finish
  context.callbackWaitsForEmptyEventLoop = false;
  event.body = JSON.parse(event.body);
  
  dbInstance.connectDB().then(() => {
    if ( !event.body.task ) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid Data",
          input: event,
        }),
      };
      callback(null, response);
    }
    console.log("Adding Task.");
    new tasksModel({
      task: event.body.task,
      isDone: false,
      taskUser: event.pathParameters.userId
    }).save((err, task) => {
      if (err) {
        console.log(err);
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            message: err.message,
            input: event,
          }),
        };
        callback(null, response);
      }
      usersModel.findById(event.pathParameters.userId, (err, user) => {
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
        user.tasks.push(task._id);
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
