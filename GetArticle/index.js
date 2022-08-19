var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var s3Client = new AWS.S3({apiVersion: '2012-08-10'});
var ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    
    var bucketName = 'block-comment-blog-articles-devo';
    var tableName = 'BlockCommentBlogMetadataDevo';
    if ('production' === process.env.ENVIRONMENT) {
        bucketName = 'block-comment-blog-articles';
        tableName = 'BlockCommentBlogMetadata';
    }
    
    var s3Params = {
        Bucket: bucketName,
        Key: event.articleId + '.html'
    };
    var ddbParams = {
        TableName: tableName,
        ExpressionAttributeValues: {
            ':isVisible' : { S : 'true' },
            ':publicationDate' : { S : new Date().toISOString() },
            ':articleId' : { S: event.articleId } 
        },
        KeyConditionExpression: 'isVisible = :isVisible and publicationDate <= :publicationDate',
        FilterExpression: 'articleId = :articleId'
    }
    
    try {
        const s3Data = await s3Client.getObject(s3Params).promise();
        const ddbData = await ddbClient.query(ddbParams).promise();
        
        const response = {
            statusCode: 200,
            body: {
                "content": s3Data.Body.toString(),
                "metadata": ddbData.Items.shift()
            }
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
