
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.S3ID,
    secretAccessKey: process.env.S3Secret,
    region: process.env.S3Region
});

const Manager = {
    uploadFile: (file, callback) => {
        const ext = path.extname(file.name);
        const key = `${uuid()}${ext}`;

        const params = {
            Bucket: process.env.S3BucketName,
            Key: key,
            Body: file.data,
            ACL: process.env.S3Permissions
        };

        s3.upload(params, (err, data) => {
            if (err) throw err;

            const obj = {
                fileUrl: data.Location,
                fileName: file.name,
                fileSize: file.size,
                fileKey: key
            };

            callback(obj);
        });
    }
};

module.exports = Manager;