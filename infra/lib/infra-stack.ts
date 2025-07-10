import { RemovalPolicy, Stack, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {
  ApplicationName,
  CloudfrontDistributionCertificateId,
  CloudfrontDistributionId,
  EnvironmentTag,
  OriginAccessIdentityId,
  ProjectTag,
  TenantEnvironment,
  WebsiteBucketId
} from './infra-constants';
import {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { InfrastructureStackProps } from './infra.types';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, WebsiteBucketId, {
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const originAccessIdentity = new OriginAccessIdentity(this, OriginAccessIdentityId);
    websiteBucket.grantRead(originAccessIdentity);

    new Distribution(this, CloudfrontDistributionId, {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, { originAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200
        }
      ],
      defaultRootObject: 'index.html',
      comment: 'Portfolio Website Cloudfront Distribution',
      domainNames: [`www.${props.websiteDomainName}`],
      certificate: Certificate.fromCertificateArn(
        this,
        CloudfrontDistributionCertificateId,
        props.certificateArn
      )
    });

    Tags.of(this).add(ProjectTag, ApplicationName);
    Tags.of(this).add(EnvironmentTag, TenantEnvironment);
  }
}
