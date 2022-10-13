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
  const eventos = "eventos";
  let body;
  let params;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /posts":
        if (!event.queryStringParameters) {
          body = await dynamo
            .scan({
              TableName: comunicatecmm,
            })
            .promise()
            .then((res) => {
              callback(null, response(200, res.Items));
            })
            .catch((err) => callback(null, response(err.statusCode, err)));
        } else {
          if (event.queryStringParameters.id) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "id = :id",
              KeyConditionExpression: "id = :id",
              ExpressionAttributeValues: {
                ":id": parseInt(event.queryStringParameters.id, 10),
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.username) {
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
          } else if (event.queryStringParameters.title) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "title = :title",
              KeyConditionExpression: "title = :title",
              ExpressionAttributeValues: {
                ":title": event.queryStringParameters.title,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.department) {
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
          } else if (event.queryStringParameters.destined_career) {
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
          } else if (event.queryStringParameters.content) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "content = :content",
              KeyConditionExpression: "content = :content",
              ExpressionAttributeValues: {
                ":content": event.queryStringParameters.content,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.publication_date) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "publication_date = :publication_date",
              KeyConditionExpression: "publication_date = :publication_date",
              ExpressionAttributeValues: {
                ":publication_date":
                  event.queryStringParameters.publication_date,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.reactions) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reactions = :reactions",
              KeyConditionExpression: "reactions = :reactions",
              ExpressionAttributeValues: {
                ":reactions": parseInt(event.queryStringParameters.reactions),
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.reference) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reference = :reference",
              KeyConditionExpression: "reference = :reference",
              ExpressionAttributeValues: {
                ":reference": parseInt(event.queryStringParameters.reference),
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
              id: parseInt(event.pathParameters.id),
            },
          })
          .promise();
        break;
      case "GET /posts/quantity/{number}":
        let numberOfPosts = event.pathParameters.number;
        params = {
          TableName: comunicatecmm,
          Limit: numberOfPosts,
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
          Segment: parseInt(page) - 1,
        };
        if (!event.queryStringParameters) {
          body = await dynamo
            .scan(params)
            .promise()
            .then((res) => {
              callback(null, response(200, res.Items));
            })
            .catch((err) => callback(null, response(err.statusCode, err)));
        } else {
          if (event.queryStringParameters.id) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "id = :id",
              KeyConditionExpression: "id = :id",
              ExpressionAttributeValues: {
                ":id": parseInt(event.queryStringParameters.id, 10),
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.username) {
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
          } else if (event.queryStringParameters.title) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "title = :title",
              KeyConditionExpression: "title = :title",
              ExpressionAttributeValues: {
                ":title": event.queryStringParameters.title,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.department) {
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
          } else if (event.queryStringParameters.destined_career) {
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
          } else if (event.queryStringParameters.content) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "content = :content",
              KeyConditionExpression: "content = :content",
              ExpressionAttributeValues: {
                ":content": event.queryStringParameters.content,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.publication_date) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "publication_date = :publication_date",
              KeyConditionExpression: "publication_date = :publication_date",
              ExpressionAttributeValues: {
                ":publication_date":
                  event.queryStringParameters.publication_date,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.reactions) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reactions = :reactions",
              KeyConditionExpression: "reactions = :reactions",
              ExpressionAttributeValues: {
                ":reactions": parseInt(event.queryStringParameters.reactions),
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.reference) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reference = :reference",
              KeyConditionExpression: "reference = :reference",
              ExpressionAttributeValues: {
                ":reference": parseInt(event.queryStringParameters.reference),
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
      case "PUT /posts":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "comunicatecmm",
            Item: {
              id: parseInt(requestJSON.id),
              title: requestJSON.title,
              username: requestJSON.username,
              reference: requestJSON.reference,
              department: requestJSON.department,
              destined_career: requestJSON.destined_career,
              content: requestJSON.content,
              publication_date: requestJSON.publication_date,
              reactions: parseInt(requestJSON.reactions),
            },
          })
          .promise();
        body = `Put post ${requestJSON.id}`;
        break;
      case "DELETE /posts/{id}":
        await dynamo
          .delete({
            TableName: "comunicatecmm",
            Key: {
              id: parseInt(event.pathParameters.id),
            },
          })
          .promise();
        body = `Deleted post ${parseInt(requestJSON.id)}`;
        break;

      case "GET /events":
        if (!event.queryStringParameters) {
          body = await dynamo
            .scan({
              TableName: eventos,
            })
            .promise()
            .then((res) => {
              callback(null, response(200, res.Items));
            })
            .catch((err) => callback(null, response(err.statusCode, err)));
        } else {
          if (event.queryStringParameters.id) {
            params = {
              TableName: eventos,
              FilterExpression: "id = :id",
              KeyConditionExpression: "id = :id",
              ExpressionAttributeValues: {
                ":id": parseInt(event.queryStringParameters.id, 10),
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.username) {
            params = {
              TableName: eventos,
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
          } else if (event.queryStringParameters.title) {
            params = {
              TableName: eventos,
              FilterExpression: "title = :title",
              KeyConditionExpression: "title = :title",
              ExpressionAttributeValues: {
                ":title": event.queryStringParameters.title,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.event_date) {
            params = {
              TableName: eventos,
              FilterExpression: "event_date = :event_date",
              KeyConditionExpression: "event_date = :event_date",
              ExpressionAttributeValues: {
                ":event_date": event.queryStringParameters.event_date,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.place) {
            params = {
              TableName: eventos,
              FilterExpression: "place = :place",
              KeyConditionExpression: "place = :place",
              ExpressionAttributeValues: {
                ":place": event.queryStringParameters.place,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.content) {
            params = {
              TableName: eventos,
              FilterExpression: "content = :content",
              KeyConditionExpression: "content = :content",
              ExpressionAttributeValues: {
                ":content": event.queryStringParameters.content,
              },
            };
            body = await dynamo
              .scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          } else if (event.queryStringParameters.publication_date) {
            params = {
              TableName: eventos,
              FilterExpression: "publication_date = :publication_date",
              KeyConditionExpression: "publication_date = :publication_date",
              ExpressionAttributeValues: {
                ":publication_date":
                  event.queryStringParameters.publication_date,
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
      case "GET /events/{id}":
        body = await dynamo
          .get({
            TableName: "eventos",
            Key: {
              id: parseInt(event.pathParameters.id),
            },
          })
          .promise();
        break;
      case "GET /events/quantity/{number}":
        let numberOfEvents = event.pathParameters.number;
        params = {
          TableName: eventos,
          Limit: numberOfEvents,
        };
        body = await dynamo
          .scan(params)
          .promise()
          .then((res) => {
            callback(null, response(200, res.Items));
          })
          .catch((err) => callback(null, response(err.statusCode, err)));
        break;
      case "GET /events/quantity/{pages}/{elements}/{page}":
        let numberOfPage = event.pathParameters.pages;
        let numberOfElement = event.pathParameters.elements;
        let pages = event.pathParameters.page;
        params = {
          TableName: eventos,
          TotalSegments: numberOfPage,
          Limit: numberOfElement,
          Segment: parseInt(pages) - 1,
        };
        body = await dynamo
          .scan(params)
          .promise()
          .then((res) => {
            callback(null, response(200, res.Items));
          })
          .catch((err) => callback(null, response(err.statusCode, err)));
        break;
      case "PUT /events":
        let requestJSON_1 = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "eventos",
            Item: {
              id: parseInt(requestJSON_1.id),
              title: requestJSON_1.title,
              username: requestJSON_1.username,
              content: requestJSON_1.content,
              publication_date: requestJSON_1.publication_date,
              event_date: requestJSON_1.event_date,
              place: requestJSON_1.place,
            },
          })
          .promise();
        body = `Put post ${requestJSON_1.id}`;
        break;
      case "DELETE /events/{id}":
        await dynamo
          .delete({
            TableName: "eventos",
            Key: {
              id: parseInt(event.pathParameters.id),
            },
          })
          .promise();
        body = `Deleted post ${parseInt(requestJSON.id)}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
