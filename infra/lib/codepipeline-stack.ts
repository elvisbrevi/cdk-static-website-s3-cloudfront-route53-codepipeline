"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
// import { LambdaHelper } from '../helpers/lambda-helper';
// import { ApiGwHelper } from '../helpers/apigw-helper';
// import { DynamoDbHelper } from '../helpers/dynamodb-helper';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { env } from 'process';
import { PipelineStage } from './stage-stack';

export class CodePipelineStack extends Stack {
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'example-pipeline', {
      pipelineName: 'example-pipeline',
      synth: new ShellStep('synth-step', {
        input: CodePipelineSource.gitHub('elvisbrevi/cdk-codepipeline-template', 'master'),
        installCommands: ['cd infra', 
                          'npm i -g npm@latest'],
        commands: ['npm install',
                   'npm ci',
                   'npm run build',
                   'npx cdk synth'],
        primaryOutputDirectory: 'infra/cdk.out'
      }),
    });

    const testingStage = pipeline.addStage(new PipelineStage(this, 'test', {
      env: props?.env
    }));

    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    const prouctionStage = pipeline.addStage(new PipelineStage(this, 'prod', {
      env: props?.env
    }));

  }

}
