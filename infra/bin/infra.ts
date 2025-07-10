#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { CertificateArnEnvKey, DomainNameEnvKey } from '../lib/infra-constants';

const app = new cdk.App();

const certificateArn: string =
  app.node.tryGetContext(CertificateArnEnvKey) || process.env[CertificateArnEnvKey] || '';
const websiteDomainName: string =
  app.node.tryGetContext(DomainNameEnvKey) || process.env[DomainNameEnvKey] || '';

new InfraStack(app, 'CodexInfraStack', {
  certificateArn,
  websiteDomainName
});
