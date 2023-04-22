"use strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { WebSiteStage } from '../stages/prod-stage';

export class PipelineStack extends Stack {
  
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


    const stageOpts = {  
      pre: [
        new ShellStep('vite-build-step', {
          installCommands: ['npm i -g npm@latest'],
          commands: ['ls',
                     'tsc && vite build']
        })
      ]
    };

    pipeline.addStage(
      new WebSiteStage(
        this, 
        'prod', 
        {
          env: props?.env
        }
      ),
      stageOpts
    );

  }

}
