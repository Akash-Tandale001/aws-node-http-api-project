"use strict"
const {v4}=require('uuid')
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonParser = require('@middy/http-json-body-parser')
const addTodo = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const {todo} = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();
  console.log("This is id: ",id)
  const newTodo ={
    id,
    todo,
    createdAt,
    completed: false
  }
  await dynamo.put({
    TableName:"TodoTable",
    Item: newTodo
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
}

module.exports ={
  handler : middy(addTodo).use(httpJsonParser())
}
