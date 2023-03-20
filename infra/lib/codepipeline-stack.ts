"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineStage } from './infra-stage';

export class CodePipelineStack extends Stack {
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    
    super(scope, id, props);

    const pipeline = new CodePipeline(this, id, {
      pipelineName: id,
      synth: new ShellStep('synth-step', {
        input: CodePipelineSource.gitHub('elvisbrevi/personal-website-front', 'master'),
        installCommands: ['cd infra', 
                          'npm i -g npm@latest'],
        commands: ['npm install',
                   'npm ci',
                   'npm run build',
                   'npx cdk synth'],
        primaryOutputDirectory: 'infra/cdk.out'
      }),
    });

    const testingStage = pipeline.addStage(new PipelineStage(this, 'dev', {
      env: props?.env
    }));

    // testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // const prouctionStage = pipeline.addStage(new PipelineStage(this, 'prod', {
    //   env: props?.env
    // }));

  }

}
