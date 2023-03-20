"use-strict"
import * as cdk_dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export class DynamoDbHelper  {

    public static CreateTable(construct: Construct, name: string) : cdk_dynamodb.Table {

        return new cdk_dynamodb.Table(construct, name, {
            partitionKey: { name: 'name', type: cdk_dynamodb.AttributeType.STRING },
            tableName: name,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}