'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const dbInstance = new dbAccess();

module.exports.editUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  event.body = JSON.parse(event.body);

  dbInstance.connectDB().then(() => {
    const updUser = {
    }
    if (event.body.name) {
      updUser.name = event.body.name;
    }
    if (event.body.phone) {
      updUser.phone = event.body.phone;
    }
    if (event.body.tasks) {
      updUser.tasks = event.body.tasks;
    }
    usersModel.findByIdAndUpdate(event.pathParameters.userId, updUser, (err, user) => {
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
          data: user,
          input: event,
        }),
      };
      callback(null, response);
    });
  });  
};
