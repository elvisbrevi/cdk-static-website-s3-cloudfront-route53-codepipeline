#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/stacks/pipeline-stack';

const env = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: 'us-east-1' 
}; 

const app = new cdk.App();

new PipelineStack(app, 'pipeline-blog-frontend', { env: env });

app.synth();