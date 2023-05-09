# CDK TypeScript Project for Static Website Hosting on AWS with S3, CloudFront, Route53, and CodePipeline
Welcome to your CDK TypeScript project for static website hosting on AWS! This project is designed to make it easy to deploy a static website using Amazon S3, CloudFront, Route53, and CodePipeline.

## Overview
This CDK TypeScript project includes the following AWS resources:

* S3 bucket: A bucket to store your static website files.
* CloudFront distribution: A content delivery network that caches your website content globally and delivers it to users based on their location.
* Route53 hosted zone: A DNS service for routing traffic to your website.
* CodePipeline pipeline: A continuous delivery pipeline that automatically deploys changes to your website.

## Prerequisites
Before you get started, make sure you have the following:

An AWS account
The AWS CLI installed on your local machine
Node.js installed on your local machine

## Getting Started
To get started with this project, follow these steps:

* Clone the repository to your local machine.
* Navigate to the project directory and run npm install to install the project dependencies.
* Open the lib/static-website-stack.ts file and update the domainName and certificateArn variables to match your own domain name and SSL certificate ARN.
* Run npm run build to build the project.
* Run cdk deploy to deploy the stack to your AWS account.
* Once the stack is deployed, you can upload your website files to the S3 bucket and access your website using the domain name you specified.

## CI/CD with CodePipeline
This project includes a pre-configured CodePipeline pipeline that automatically deploys changes to your website whenever you push changes to your code repository.

To use this feature, follow these steps:

* Set up a code repository in GitHub, CodeCommit, or other supported code repository.
* Configure your pipeline using the AWS Management Console or AWS CLI.
* Push changes to your code repository, and watch as the pipeline automatically deploys your changes to your website.

## Conclusion
This CDK TypeScript project provides an easy way to deploy a static website on AWS using S3, CloudFront, Route53, and CodePipeline. With this project, you can quickly and easily deploy your website, and take advantage of the benefits of AWS services to ensure high performance, reliability, and scalability.
