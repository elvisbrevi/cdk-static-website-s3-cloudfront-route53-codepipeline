"use-strict";
import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

const WEB_APP_DOMAIN = "elvisbrevi.com";

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: StackProps) {
        super(scope, id, props);

        //Create S3 Bucket for our website
        const siteBucket = new s3.Bucket(this, id + '-bucket', {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
            accessControl: s3.BucketAccessControl.PUBLIC_READ,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // Crear S3 Bucket para redireccionamiento
        const redirectBucket = new s3.Bucket(this, id + '-redirect-bucket', {
            bucketName: 'www.' + WEB_APP_DOMAIN,
            websiteRedirect: { hostName: WEB_APP_DOMAIN, protocol: s3.RedirectProtocol.HTTPS },
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        //Get The Hosted Zone
        const zone = route53.HostedZone.fromLookup(this, id + '-hosted-zone', {
            domainName: WEB_APP_DOMAIN,
        });

        //Create Certificate
        const siteCertificateArn = new acm.Certificate(this, id + '-certificate', {
            domainName: WEB_APP_DOMAIN,
            subjectAlternativeNames: ['www.elvisbrevi.com'],
            validation: acm.CertificateValidation.fromDns(zone),
            certificateName: WEB_APP_DOMAIN,
        });
        
        //Create CloudFront Distribution
        const siteDistribution = new cloudfront.CloudFrontWebDistribution(this, id + '-cf-dist', {
            viewerCertificate: {
                aliases: [WEB_APP_DOMAIN],
                props: {
                    acmCertificateArn: siteCertificateArn.certificateArn,
                    sslSupportMethod: cloudfront.SSLMethod.SNI,
                    minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
                }
            },
            originConfigs: [{
                s3OriginSource: {

                    s3BucketSource: siteBucket,
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }]
        });
        
        const redirectSiteDistribution = new cloudfront.CloudFrontWebDistribution(this, id + '-redirect-cf-dist', {
            viewerCertificate: {
                aliases: ['www.' + WEB_APP_DOMAIN],
                props: {
                    acmCertificateArn: siteCertificateArn.certificateArn,
                    sslSupportMethod: cloudfront.SSLMethod.SNI,
                    minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
                }
            },
            defaultRootObject: '',
            originConfigs: [{
                s3OriginSource: {
                    s3BucketSource: redirectBucket
                }, 
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }]
        });

        //Create A Record Custom Domain to CloudFront CDN
        new route53.ARecord(this, id + '-aRecord', {
            zone: zone,
            recordName: WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(siteDistribution))
        });

        new route53.ARecord(this, id + '-redirect-aRecord', {
            zone: zone,
            recordName: "www." + WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(redirectSiteDistribution)),
        });

        // Deploy the React app from the 'build' directory to the S3 bucket
        new s3deploy.BucketDeployment(this, id + '-bucket-deployment', {
            sources: [s3deploy.Source.asset('../dist')], // Adjust the path if necessary
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ['/*']
        });
    }
}