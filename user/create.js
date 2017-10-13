'use strict';

const db = require('../lib/index');
const mongoose = require('mongoose');
const usersModel = require('../model/users');

module.exports.hello = (event, context, callback) => {

  console.log(mongoose.connection.readyState);
  if (mongoose.connection.readyState !== 1) {
    const mongoUrl = process.env.MONGOLAB_URL_TODO;
    
    db = mongoose.connect(mongoUrl, {
        useMongoClient: true
    })
    .then(() => {
        console.log("Connection to Database Established.");
    })
    .catch(err =>  {
        console.log("Error while connecting to Database", err)
    });
  }

  if ( !event.body.name || !event.body.phone ) {
    const reeponse = {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid Data",
        input: event,
      }),
    };
    callback(null, response);
  }
  new usersModel({
    name: event.body.name,
    phone: event.body.phone
  }).save((err) => {
    if (err) {
      console.log(err);
      const reeponse = {
        statusCode: 500,
        body: JSON.stringify({
          message: err.message,  // You need to write the response object and call callback
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
};
