"use strict"
const AWS = require('aws-sdk')
const fetchTodos = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    let todos;
    try {

        const result = await dynamo.scan({
            TableName: "TodoTable"
        }).promise();
        todos = result.Items;
    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todos),
    };
}

module.exports = {
    handler: fetchTodos
}
