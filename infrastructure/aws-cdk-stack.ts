import { Stack, StackProps, RemovalPolicy, Duration, CfnOutput } from "aws-cdk-lib/core";

import { Construct } from "constructs";
import { FrontendStack } from "./stacks/frontend-stack";
import { BackendStack } from "./stacks/backend-stack";

export class AwsCdkDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //run backend codebuild stack
    new BackendStack(this, "BackendStack");

    //run frontend deploy stack
    new FrontendStack(this, "FrontendStack");
  }
}
