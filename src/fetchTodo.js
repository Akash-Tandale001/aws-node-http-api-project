"use strict"
const AWS = require('aws-sdk')
const fetchTodo = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    let todo;
    try {

        const result = await dynamo.get({
            TableName: "TodoTable",
            Key: { id }
        }).promise();
        todo = result.Item;
    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todo),
    };
}

module.exports = {
    handler: fetchTodo
}
