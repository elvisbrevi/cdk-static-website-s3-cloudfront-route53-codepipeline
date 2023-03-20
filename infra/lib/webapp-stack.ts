"use-strict";
import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as deploy from 'aws-cdk-lib/aws-s3-deployment';

const WEB_APP_DOMAIN = "elvisbrevi.com";

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
        super(scope, id, props);

        //Get The Hosted Zone
        const zone = route53.HostedZone.fromLookup(this, "Zone", {
            domainName: WEB_APP_DOMAIN,
        });
        console.log(zone.zoneName);

        //Create S3 Bucket for our website
        const siteBucket = new s3.Bucket(this, id, {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        //Create Certificate
        const siteCertificateArn = new acm.Certificate(this, "SiteCertificate", {
            domainName: WEB_APP_DOMAIN,
            //hostedZone: zone,
            //region: "us-east-1"  //standard for acm certs
        }).certificateArn;

        //Create CloudFront Distribution
        const siteDistribution = new cloudfront.CloudFrontWebDistribution(this, "SiteDistribution", {
            // aliasConfiguration: {
            //     acmCertRef: siteCertificateArn,
            //     names: [WEB_APP_DOMAIN],
            //     securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019
            // },
            
            originConfigs: [{
                customOriginSource: {
                    domainName: siteBucket.bucketWebsiteDomainName,
                    originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }]
        });

        //Create A Record Custom Domain to CloudFront CDN
        new route53.ARecord(this, "SiteRecord", {
            recordName: WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(siteDistribution)),
            zone
        });

        //Deploy site to s3
        new deploy.BucketDeployment(this, "Deployment", {
            sources: [deploy.Source.asset("../dist")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/*"]
        });
    }
}