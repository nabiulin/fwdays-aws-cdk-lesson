import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { BucketDeploymentProps } from "aws-cdk-lib/aws-s3-deployment";

export class AwsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const bucket = this.createBucket();

    this.uploadFile(bucket);
  }

  createBucket() {
    const blockPublicAccessPolicy = {
      blockPublicAcls: false,
      ignorePublicAcls: false,
      blockPublicPolicy: false,
      restrictPublicBuckets: false,
    };

    const bucketProps = {
      bucketName: `aws-s3-fwdays-${this.account}-${this.region}-lesson-1`.toLowerCase(),
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
      blockPublicAccess: new s3.BlockPublicAccess(blockPublicAccessPolicy),
    };

    return new s3.Bucket(this, "FWDaysS3Bucket", bucketProps);
  }

  uploadFile(bucket: s3.Bucket) {
    const deployOptions: BucketDeploymentProps = {
      sources: [s3deploy.Source.asset("./uploads")],
      destinationBucket: bucket,
    };

    new s3deploy.BucketDeployment(this, "DeployFiles", deployOptions);
  }
}
