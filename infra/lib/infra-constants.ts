export const CertificateArnEnvKey = 'certificateArn';
export const DomainNameEnvKey = 'domainName';

export const ProjectTag = 'Project';
export const EnvironmentTag = 'Environment';

export const ApplicationName = 'codex';
export const TenantEnvironment = 'prod';

export const WebsiteBucketId = `${ApplicationName}-website-${TenantEnvironment}`;
export const OriginAccessIdentityId = `${ApplicationName}-oai-${TenantEnvironment}`;
export const CloudfrontDistributionId = `${ApplicationName}-cf-distribution-${TenantEnvironment}`;
export const CloudfrontDistributionCertificateId = `${ApplicationName}-cf-certificate-${TenantEnvironment}`;
