import { Stack, StackProps, RemovalPolicy, Duration, CfnOutput } from "aws-cdk-lib/core";

import { Construct } from "constructs";
import { FrontendStack } from "./stacks/frontend-stack";

export class AwsCdkDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new FrontendStack(this, "FrontendStack");
  }
}
