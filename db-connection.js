const mongoose = require('mongoose');
const config = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@funcept.tz1wo.mongodb.net/test`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    })
        .then(db => console.log('Connected with MongoDB.'))
        .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));
}