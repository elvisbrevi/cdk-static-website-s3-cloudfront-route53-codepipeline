"use strict";
import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

const DOMAIN_NAME = "elvisbrevi.com";
const WWW_DOMAIN_NAME = `www.${DOMAIN_NAME}`;

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
        super(scope, id, props);

        // Create the bucket hosting the website
        const staticWebsiteBucket = new s3.Bucket(this, `WebsiteBucket-${id}`, {
            websiteIndexDocument: 'index.html',
            removalPolicy: RemovalPolicy.DESTROY,
        });

        // Create the CloudFront Origin Access Identity
        const oin = new cloudfront.OriginAccessIdentity(scope, `CloudFrontOAI-${id}`);
        staticWebsiteBucket.grantRead(oin);

        //Get The Hosted Zone
        const hostedZone = route53.HostedZone.fromLookup(this, `HostedZone-${id}`, {
            domainName: DOMAIN_NAME,
        });

        // Create the HTTPS certificate
        const httpsCertificate = new acm.Certificate(this, `HttpsCertificate-${id}`, {
            domainName: DOMAIN_NAME,
            subjectAlternativeNames: [WWW_DOMAIN_NAME],
            validation: acm.CertificateValidation.fromDns(hostedZone),
        });

        // Create the CloudFront distribution linked to the website hosting bucket and the HTTPS certificate
        const cloudFrontDistribution = new cloudfront.Distribution(this, `CloudFrontDistribution-${id}`, {
            defaultBehavior: {
                origin: new S3Origin(staticWebsiteBucket, {
                    originAccessIdentity: oin,
                }),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            domainNames: [DOMAIN_NAME, WWW_DOMAIN_NAME],
            certificate: httpsCertificate
        });
        
        // Add DNS records to the hosted zone to redirect from the domain name to the CloudFront distribution
        new route53.ARecord(this, `CloudFrontRedirect-${id}`, {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new CloudFrontTarget(cloudFrontDistribution)),
            recordName: DOMAIN_NAME, 
        });
        
        // Same from www.sub-domain
        new route53.ARecord(this, `CloudFrontWWWRedirect-${id}`, {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new CloudFrontTarget(cloudFrontDistribution)),
            recordName: WWW_DOMAIN_NAME,
        });

        // Deploy the website to the hosting bucket
        new s3deploy.BucketDeployment(this, `BucketDeployment-${id}`, {
            sources: [s3deploy.Source.asset('../dist')], 
            destinationBucket: staticWebsiteBucket,
            distributionPaths: ['/*'], 
            distribution: cloudFrontDistribution,
            retainOnDelete: false,
        });
    }
}