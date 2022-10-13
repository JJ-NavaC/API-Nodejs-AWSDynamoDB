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
          else if (event.queryStringParameters.nombre_del_usuario) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "nombre_del_usuario = :nombre_del_usuario",
              KeyConditionExpression: "nombre_del_usuario = :nombre_del_usuario",
              ExpressionAttributeValues: {
                ":nombre_del_usuario": event.queryStringParameters.nombre_del_usuario,
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
          else if (event.queryStringParameters.departamento) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "departamento = :departamento",
              KeyConditionExpression: "departamento = :departamento",
              ExpressionAttributeValues: {
                ":departamento": event.queryStringParameters.departamento,
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
          else if (event.queryStringParameters.carrera_destinada) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "carrera_destinada = :carrera_destinada",
              KeyConditionExpression: "carrera_destinada = :carrera_destinada",
              ExpressionAttributeValues: {
                ":carrera_destinada": event.queryStringParameters.carrera_destinada,
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
          else if (event.queryStringParameters.contenido) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "contenido = :contenido",
              KeyConditionExpression: 'contenido = :contenido',
              ExpressionAttributeValues: {
                ":contenido": event.queryStringParameters.contenido
              }
            };
            body = await dynamo.scan(params)
              .promise()
              .then((res) => {
                callback(null, response(200, res.Items));
              })
              .catch((err) => callback(null, response(err.statusCode, err)));
          }
          else if (event.queryStringParameters.fecha_de_publicacion) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "fecha_de_publicacion = :fecha_de_publicacion",
              KeyConditionExpression: "fecha_de_publicacion = :fecha_de_publicacion",
              ExpressionAttributeValues: {
                ":fecha_de_publicacion": event.queryStringParameters.fecha_de_publicacion,
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
          else if (event.queryStringParameters.reacciones) {
            params = {
              TableName: comunicatecmm,
              FilterExpression: "reacciones = :reacciones",
              KeyConditionExpression: "reacciones = :reacciones",
              ExpressionAttributeValues: {
                ":reacciones": event.queryStringParameters.reacciones,
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
      case "GET /posts/cant/{number}":
        let numberOfPosts = event.pathParameters.number;
        params = {
          TableName: comunicatecmm,
          Limit: numberOfPosts,
        };
        body = await dynamo.scan(params)
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
              nombre_del_usuario: requestJSON.nombre_del_usuario,
              departamento: requestJSON.departamento,
              carrera_destinada: requestJSON.carrera_destinada,
              contenido: requestJSON.contenido,
              fecha_de_publicacion: requestJSON.fecha_de_publicacion,
              reacciones: requestJSON.reacciones
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
