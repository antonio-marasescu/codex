import { StackProps } from 'aws-cdk-lib';

export interface InfrastructureStackProps extends StackProps {
  certificateArn: string;
  websiteDomainName: string;
}
