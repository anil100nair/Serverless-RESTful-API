const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

class dbAccess {
    constructor() {
        this.mongoUrl = process.env.MONGOLAB_URL_TODO;
    }
    connectDB () {
        console.log(mongoose.connection.readyState);
        return  new Promise((resolve, reject) => {
            if (this.db && !(mongoose.connection.readyState === 1) || !this.db ) {
                const db = mongoose.connect(this.mongoUrl, {
                    useMongoClient: true
                }).then(() => {
                    console.log('Connected to Database.');
                    this.db = db;
                    resolve();             
                });
            } else {
                console.log('Connection already exists!');
                resolve();
            }
        }).catch(err => {
            console.log('Error while connecting to database: ', err);
            reject(err);
        });
    }
}
module.exports = dbAccess;