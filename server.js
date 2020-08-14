require('./db-connection')();
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config.json');
const users = require('./routes/user');
const posts = require('./routes/post');
const likes = require('./routes/like');
const dislikes = require('./routes/dislike');
const follows = require('./routes/follow');
const PORT = process.env.PORT || config.port;
const path = require("path");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use(fileUpload({
    limits: { fileSize: parseInt(config.fileSizeLimitMBs) * 1024 * 1024 },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send("API is working..."));
app.use('/users', users);
app.use('/posts', posts);
app.use('/likes', likes);
app.use('/dislikes', dislikes);
app.use('/follows', follows);

app.listen(PORT, () => console.log(`API started on PORT ${PORT}.`));