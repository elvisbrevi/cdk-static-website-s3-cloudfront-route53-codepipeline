"use-strict";
import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as deploy from 'aws-cdk-lib/aws-s3-deployment';
import { ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';

const WEB_APP_DOMAIN = "elvisbrevi.com";

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
        super(scope, id, props);

        //Get The Hosted Zone
        const zone = route53.HostedZone.fromLookup(this, id + '-hosted-zone', {
            domainName: WEB_APP_DOMAIN,
        });
        console.log(zone.zoneName);

        //Create S3 Bucket for our website
        const siteBucket = new s3.Bucket(this, id + '-bucket', {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        //Create Certificate
        const siteCertificateArn = new acm.Certificate(this, id + '-certificate', {
            domainName: WEB_APP_DOMAIN,
            certificateName: WEB_APP_DOMAIN,
            subjectAlternativeNames: ['www.elvisbrevi.com'],
            validation: acm.CertificateValidation.fromDns(zone)
            //hostedZone: zone,
            //region: "us-east-1"  //standard for acm certs
        }).certificateArn;

        //Create CloudFront Distribution
        const siteDistribution = new cloudfront.CloudFrontWebDistribution(this, id + '-cf-dist', {
            // aliasConfiguration: {
            //     acmCertRef: siteCertificateArn,
            //     names: [WEB_APP_DOMAIN],
            //     securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019
            // },
            viewerCertificate: {
                aliases: [WEB_APP_DOMAIN],
                props: {
                    acmCertificateArn: siteCertificateArn,
                    sslSupportMethod: 'sni-only'
                }
            },
            
            
            // ViewerCertificate.fromAcmCertificate(
            //     acm.Certificate.fromCertificateArn(this, id, siteCertificateArn)
            // ),
            originConfigs: [{
                customOriginSource: {
                    domainName: siteBucket.bucketWebsiteDomainName,
                    originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }]
        });

        //Create A Record Custom Domain to CloudFront CDN
        new route53.ARecord(this, id + '-aRecord', {
            recordName: WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(siteDistribution)),
            zone
        });

        //Deploy site to s3
        new deploy.BucketDeployment(this, id + '-bucket-deployment', {
            sources: [deploy.Source.asset("../dist")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/*"]
        });
    }
}