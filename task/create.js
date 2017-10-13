'use strict';

const db = require('../lib/index');
const mongoose = require('mongoose');

module.exports.hello = (event, context, callback) => {
 
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
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

};
