import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const input = {
	TableName : "user-" + process.env.stageName,
	Item: {
		"name": {
            S: "alberto"
        },
		"country": {
            S: "argentina"
        },
	}
};

async function createItem(input){
	const client = new DynamoDBClient();
	const command = new PutItemCommand(input);
	return await client.send(command);
}

export const handler = async (event) => {
  	try {
    	const response = await createItem(input);
    	return { 
			statusCode: response.statusCode,
			body: 'Successfully created item!' 
		}
  	} catch (err) {
    	return { 
			statusCode: err.statusCode,
			body: err.body 
		}
	}
};