import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

import { Stack, StackProps, RemovalPolicy, Duration, CfnOutput } from "aws-cdk-lib/core";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

import { Construct } from "constructs";
import { BucketDeploymentProps } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";

const DEFAULT_ROOT_OBJECT = "index.html";
const LOCAL_DIST_FOLDER_PATH = "./frontend/dist";

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.init();
  }

  init() {
    const bucket = this.createBucket();
    const distribution = this.createDistribution(bucket);

    this.deployDist(bucket, distribution);
  }

  createBucket() {
    const blockPublicAccessPolicy = {
      blockPublicAcls: false,
      ignorePublicAcls: false,
      blockPublicPolicy: false,
      restrictPublicBuckets: false,
    };

    const bucketProps = {
      bucketName: `aws-s3-fwdays-${this.account}-${this.region}-self-hosted-react-app`.toLowerCase(),
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
      blockPublicAccess: new s3.BlockPublicAccess(blockPublicAccessPolicy),
      //static self hosted
      publicReadAccess: true,
      websiteIndexDocument: DEFAULT_ROOT_OBJECT,
      websiteErrorDocument: DEFAULT_ROOT_OBJECT,
    };

    return new s3.Bucket(this, "FWDaysS3BucketSelfHosted", bucketProps);
  }

  createDistribution(bucket: s3.Bucket) {
    const distributionOptions = {
      defaultRootObject: DEFAULT_ROOT_OBJECT,
      comment: "Self Hosted React App",
      defaultBehavior: {
        origin: new origins.S3StaticWebsiteOrigin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: `/${DEFAULT_ROOT_OBJECT}`,
          ttl: Duration.seconds(0),
        },
      ],
    };

    return new cloudfront.Distribution(this, "SelfHostedSiteDistribution", distributionOptions);
  }

  deployDist(destinationBucket: s3.Bucket, distribution: Distribution) {
    const deployOptions: BucketDeploymentProps = {
      sources: [s3deploy.Source.asset(LOCAL_DIST_FOLDER_PATH)],
      distribution,
      distributionPaths: ["/*"],
      destinationBucket,
    };

    new s3deploy.BucketDeployment(this, "DeployFiles", deployOptions);

    new CfnOutput(this, "CloudFrontURL", {
      value: `https://${distribution.domainName}`,
    });

    new CfnOutput(this, "FWDaysS3Bucket", {
      value: destinationBucket.bucketName,
    });
  }
}
