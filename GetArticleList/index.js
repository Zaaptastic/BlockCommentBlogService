var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
exports.handler = async (event) => {

    var tableName = 'BlockCommentBlogMetadataDevo';
    if ('production' === process.env.ENVIRONMENT) {
        tableName = 'BlockCommentBlogMetadata';
    }

    var params = {
        TableName: tableName,
        ExpressionAttributeValues: {
            ':isVisible' : { S : 'true' },
            ':publicationDate' : { S : new Date().toISOString() }
        },
        KeyConditionExpression: 'isVisible = :isVisible and publicationDate <= :publicationDate',
        ScanIndexForward: false
    };
    
    try {
        const data = await ddbClient.query(params).promise();
        
        const response = {
            statusCode: 200,
            body: data.Items
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
