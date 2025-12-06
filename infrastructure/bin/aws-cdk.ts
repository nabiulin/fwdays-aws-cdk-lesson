#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../stacks/frontend-stack";
import { BackendStack } from "../stacks/backend-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// Frontend Stack - S3 + CloudFront
new FrontendStack(app, "fwdays-frontend", {
  env,
  description: "FWDays Frontend Stack - React app hosted on S3 + CloudFront",
});

// Backend Stack - ECR + CodeBuild
new BackendStack(app, "fwdays-backend", {
  env,
  description: "FWDays Backend Stack - ECR repository and CodeBuild project",
});
