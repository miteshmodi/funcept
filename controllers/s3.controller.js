
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const config = require('../config.json');
const path = require('path');

const s3 = new AWS.S3({
    accessKeyId: config.s3Id,
    secretAccessKey: config.s3Secret,
    region: config.s3Region
});

const Manager = {
    uploadFile: (file, callback) => {
        const ext = path.extname(file.name);
        const key = `${uuid()}${ext}`;

        const params = {
            Bucket: config.s3BucketName,
            Key: key,
            Body: file.data,
            ACL: config.s3Permissions
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