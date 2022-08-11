var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var s3Client = new AWS.S3({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    
    var bucketName = 'block-comment-blog-articles-devo';
    if ('production' === process.env.ENVIRONMENT) {
        bucketName = 'block-comment-blog-articles';
    }
    
    var params = {
        Bucket: bucketName,
        Key: event.articleId + '.html'
    };
    
    try {
        const data = await s3Client.getObject(params).promise();
        
        const response = {
            statusCode: 200,
            body: {
                "content": data.Body.toString()
            }
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
