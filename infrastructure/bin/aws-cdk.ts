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

new FrontendStack(app, "fwdays-frontend", {
  env,
  description: "Frontend Stack.React app hosted on S3 + CloudFront",
});

new BackendStack(app, "fwdays-backend", {
  env,
  description: "Backend Stack.ECR repository and CodeBuild project",
});
