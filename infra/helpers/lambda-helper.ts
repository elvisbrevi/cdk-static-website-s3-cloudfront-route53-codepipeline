"use-strict"
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { IQueue } from 'aws-cdk-lib/aws-sqs';
import { SqsDestination } from 'aws-cdk-lib/aws-lambda-destinations';
import { Construct } from 'constructs';

export class LambdaHelper {

    public static CreateFunctionFromFile(
        construct: Construct,
        filePath: string, 
        name: string, 
        stageName: string, 
        destination?: IQueue) : lambda.IFunction {

        return new lambda.Function(construct, name, {
            functionName: name,
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(filePath),
            environment: { stageName: stageName },
            onSuccess: destination != undefined ? new SqsDestination(destination) : undefined
        });
    }
    
    public static CreateFunctionFromEcr(
        construct: Construct,
        repository: IRepository, 
        name: string, 
        stageName: string, 
        destination?: IQueue) : lambda.IFunction {

        return new lambda.DockerImageFunction(construct, name, {
            code: lambda.DockerImageCode.fromEcr(repository, {
                tagOrDigest: "latest"
            }),
            functionName: name,
            environment: { stageName: stageName },
            onSuccess: destination != undefined ? new SqsDestination(destination) : undefined
        });
    }

    public static AddEventSource(fn: lambda.IFunction, queue: IQueue) {
        const eventSource = new SqsEventSource(queue);
        fn.addEventSource(eventSource);
    }
}
