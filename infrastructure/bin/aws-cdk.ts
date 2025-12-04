#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {AwsCdkStack} from '../lib/aws-cdk-stack';

const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
}
new AwsCdkStack(app, 'aws-cdk-lesson-2', {
    env,
    description: "FwDays AWS Cdk Stack. Lesson 1",
});
