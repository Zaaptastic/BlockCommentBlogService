var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var s3Client = new AWS.S3({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    var params = {
        Bucket: 'block-comment-blog-articles',
        Key: event.articleId + '.html'
    };
    console.log(JSON.stringify(params));
    
    try {
        const data = await s3Client.getObject(params).promise();
        
        const response = {
            statusCode: 200,
            body: data.Body.toString(),
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
