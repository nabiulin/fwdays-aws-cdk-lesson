import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib/core";
import { Construct } from 'constructs';

export class AwsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      this.createBucket();
  }

  createBucket() {
      const blockPublicAccessPolicy={
          blockPublicAcls: false,
          ignorePublicAcls: false,
          blockPublicPolicy:false,
          restrictPublicBuckets: false,
      }

      const bucketProps = {
          bucketName: `aws-s3-fwdays-${this.account}-${this.region}`.toLowerCase(),
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          versioned: true,
          removalPolicy: RemovalPolicy.RETAIN,
          blockPublicAccess: new s3.BlockPublicAccess(blockPublicAccessPolicy)
      }

      new s3.Bucket(this, 'FWDaysS3Bucket', bucketProps)
  }
}
