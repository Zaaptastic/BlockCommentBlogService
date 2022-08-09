var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
exports.handler = async (event) => {

    var params = {
        TableName: 'BlockCommentBlogMetadata'
    };
    console.log(JSON.stringify(params));
    try {
        const data = await ddbClient.scan(params).promise();
        
        const response = {
            statusCode: 200,
            body: data.Items,
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
