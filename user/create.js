'use strict';

const dbAccess = require('../lib/index');
const usersModel = require('../model/users');
const dbInstance = new dbAccess();

module.exports.createUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  event.body = JSON.parse(event.body);
  
  dbInstance.connectDB().then(() => {
    if ( !event.body.name || !event.body.phone ) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid Data",
          input: event,
        }),
      };
      callback(null, response);
    }
    console.log("Creating Model with given data.");
    new usersModel({
      name: event.body.name,
      phone: event.body.phone,
      tasks: []
    }).save((err) => {
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
      const response = {
        statusCode: 201,
        body: JSON.stringify({
          message: "User successfully created.",
          input: event,
        }),
      };
      callback(null, response);
    });
  });  
};
