const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}

exports.handler = async (event, context, callback) => {
  const comunicatecmm = "comunicatecmm";
  let body;
  let params;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "GET /posts":
        if (!event.queryStringParameters) {
          body = await dynamo.scan({
              TableName: comunicatecmm,
            })
            .promise()
            .then((res) => {
              callback(null, response(200, res.Items));
            })
            .catch((err) => callback(null, response(err.statusCode, err)));
        }
        else {
          if (event.queryStringParameters.id) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "id = :id",
              KeyConditionExpression: "id = :id",
              ExpressionAttributeValues: {
                ":id": event.queryStringParameters.id,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.username) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "username = :username",
              KeyConditionExpression: "username = :username",
              ExpressionAttributeValues: {
                ":username": event.queryStringParameters.username,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.department) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "department = :department",
              KeyConditionExpression: "department = :department",
              ExpressionAttributeValues: {
                ":department": event.queryStringParameters.department,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.destined_career) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "destined_career = :destined_career",
              KeyConditionExpression: "destined_career = :destined_career",
              ExpressionAttributeValues: {
                ":destined_career": event.queryStringParameters.destined_career,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.content) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "content = :content",
              KeyConditionExpression: 'content = :content',
              ExpressionAttributeValues: {
                ":content": event.queryStringParameters.content
              }
            };
            body = await dynamo.scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.publication_date) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "publication_date = :publication_date",
              KeyConditionExpression: "publication_date = :publication_date",
              ExpressionAttributeValues: {
                ":publication_date": event.queryStringParameters.publication_date,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.reactions) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reactions = :reactions",
              KeyConditionExpression: "reactions = :reactions",
              ExpressionAttributeValues: {
                ":reactions": event.queryStringParameters.reactions,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
        }
        break;
      case "GET /posts/{id}":
        body = await dynamo
          .get({
            TableName: "comunicatecmm",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /posts/quantity/{number}":
        let numberOfPosts = event.pathParameters.number;
        params = {
          TableName: comunicatecmm,
          Limit: numberOfPosts
        };
        body = await dynamo
          .scan(params)
          .promise()
          .then((res) => {
            callback(null, response(200, res.Items));
          })
          .catch((err) => callback(null, response(err.statusCode, err)));
        break;
      case "GET /posts/quantity/{pages}/{elements}/{page}":
        let numberOfPages = event.pathParameters.pages;
        let numberOfElements = event.pathParameters.elements;
        let page = event.pathParameters.page;
        params = { 
          TableName: comunicatecmm,
          TotalSegments: numberOfPages,
          Limit: numberOfElements,
          Segment: parseInt(page)-1
        };
        body = await dynamo
          .scan(params)
          .promise()
          .then((res) => {
            callback(null, response(200, res.Items));
          })
          .catch((err) => callback(null, response(err.statusCode, err)));
        break;
      case "PUT /posts":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "comunicatecmm",
            Item: {
              id: requestJSON.id,
              username: requestJSON.username,
              department: requestJSON.department,
              destined_career: requestJSON.destined_career,
              content: requestJSON.content,
              publication_date: requestJSON.publication_date,
              reactions: requestJSON.reactions
            }
          })
          .promise();
        body = `Put post ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  }
  catch (err) {
    statusCode = 400;
    body = err.message;
  }
  finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
