"use strict"
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonParser = require('@middy/http-json-body-parser')
const updateTodo = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const {completed} = event.body;
  const { id } = event.pathParameters;

  await dynamo.update({
    TableName:"TodoTable",
    Key: {id},
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
        ':completed': completed
    },
    ReturnValues: "ALL_NEW"
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
        message:"Todo updated"
    }),
  };
}

module.exports ={
  handler : middy(updateTodo).use(httpJsonParser())
}
