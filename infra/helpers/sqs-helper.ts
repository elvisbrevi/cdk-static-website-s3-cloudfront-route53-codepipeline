"use-strict"
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class SqsHelper  {

    public static CreateQueue(
        construct: Construct,
        name: string, 
        visibilityTimeout: number = 30, 
        receiveMessageWaitTime: number = 20) : sqs.Queue {
            
        return new sqs.Queue(construct, name, {
            queueName: name,
            visibilityTimeout: Duration.seconds(visibilityTimeout),
            receiveMessageWaitTime: Duration.seconds(receiveMessageWaitTime),
        });
    }
}