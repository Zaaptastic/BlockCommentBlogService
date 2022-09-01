# BlockCommentBlogService

Backend Lambda function code for _Block Comment_, my personal tech blog. You can visit the blog here: https://main.d3ghayqrhrykwx.amplifyapp.com/

_Block Comment_ was designed with **scheduled content** in mind. Therefore, these functions are necessary as a solution for bridging the gap of content and metadata delivery to the application. For more details, see the [BlockCommentBlogSite](https://github.com/Zaaptastic/BlockCommentBlogSite) repository.

## GetArticle

`GetArticle` fetches data for a given Article by its `articleId` value. This is useful for populating a content page since this provides both the content to display as well as any useful metadata pertaining to the given article.

```json
{
  "articleId": "some-article-id"
}
```

Connects to S3 for content and DynamoDB for metadata. `GetArticle` returns a structure containing both, for example:

```json
{
    "statusCode": 200,
    "body": {
        "content": "String-serialized Markdown or HTML content",
        "metadata": {
            "isVisible": "true",
            "publicationDate": "2022-08-25T00:42:18Z",
            "articleId": "some-article-id"
        }
    }
}
```

Additionally, `shouldSearchInvisibleArticles` can be passed in as an Optional parameter to search only `isVisible=false` items. For example:

```json
{
  "articleId": "about-me",
  "shouldSearchInvisibleArticles": true
}
```

## GetArticleList

`GetArticleList` fetches all visible articles that have currently been published, along with their metadata. This is useful for building a navigation experience which allows users to understand the available articles at a high level, then select one to explore more deeply.

It does not provide the content itself, keeping the operation lightweight.

It also currently requires no inputs, and will fetch all published items in order of most recently published.

```json
{
    "statusCode": 200,
    "body": [
        {
            "isVisible": "true",
            "publicationDate": "2022-08-25T00:42:18Z",
            "articleId": "some-article-id"
        },
        {
            "isVisible": "true",
            "publicationDate": "2022-08-22T00:42:18Z",
            "articleId": "an-olderarticle-id"
        }
    ]
}
```

## Deploying

Function code can be zipped using the following command: `zip GetArticle.zip ./GetArticle/*` (adjust as needed for `GetArticleList`). The zipped file can then be uploaded to AWS Lambda.

However, this requires several additional items:

- DynamoDB and S3 resources must exist and be accessible to the Lambda execution role
- Lambda environment variables should include a value for `ENVIRONMENT` to designate whether to connect to `development` or `production` AWS resources