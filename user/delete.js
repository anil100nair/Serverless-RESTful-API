'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const dbInstance = new dbAccess();

module.exports.deleteUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  dbInstance.connectDB().then(() => {
    usersModel.findByIdAndRemove(event.pathParameters.userId, (err, user) => {
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
      console.log('User Deleted.');
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "User Deleted!",
          data: user,
          input: event,
        }),
      };
      callback(null, response);
    });
  });  
};