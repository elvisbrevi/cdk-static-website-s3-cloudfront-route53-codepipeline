#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodePipelineStack } from '../lib/codepipeline-stack';
import { Route53Stack } from '../lib/route53-stack';

const WEB_APP_DOMAIN = "elvisbrevi.com"

const env = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
}; 
const app = new cdk.App();

new Route53Stack(app, 'test', 'dev', {env});

//new CodePipelineStack(app, 'cicd-codepipeline', { env: env });

app.synth();