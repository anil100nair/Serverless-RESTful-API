const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const mongoUrl = process.env.MONGOLAB_URL_TODO;

const db = mongoose.connect(mongoUrl, {
    useMongoClient: true
})
.then(() => {
    console.log("Connection to Database Established.");
})
.catch(err =>  {
    console.log("Error while connecting to Database", err)
});

module.exports = db;