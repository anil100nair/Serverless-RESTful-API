'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const dbInstance = new dbAccess();

module.exports.findAllUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  dbInstance.connectDB().then(() => {
    usersModel.find((err, users) => {
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
      console.log('All Users Found.');
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "All Users Found!",
          data: users,
          input: event,
        }),
      };
      callback(null, response);
    });
  });  
};

module.exports.findOneUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  dbInstance.connectDB().then(() => {
    usersModel.findById(event.pathParameters.userId, (err, user) => {
      if (user === null || err) {
        const response = {
          statusCode: 400,
          body: JSON.stringify({
            message: err || "Invalid User Id",
            input: event,
          }),
        };
        callback(null, response);
      }
      console.log('User Found.');
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "User Found!",
          data: user,
          input: event,
        }),
      };
      callback(null, response);
    });
  });  
};