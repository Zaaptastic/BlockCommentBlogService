var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
exports.handler = async (event) => {

    var params = {
        TableName: 'BlockCommentBlogMetadata',
        Key: { 'articleId': {S:'001'}, 'publicationDate': {S: '2022-08-08'} } 

    };
    console.log(JSON.stringify(params));
    try {
        const data = await ddbClient.getItem(params).promise()
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        
        return response;
    } catch (err) {
        return err;
    }
};
