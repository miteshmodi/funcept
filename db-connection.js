const mongoose = require('mongoose');
const config = require('./config.json');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    })
        .then(db => console.log('Connected with MongoDB.'))
        .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));
}