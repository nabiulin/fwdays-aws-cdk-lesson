import { Stack, StackProps, CfnOutput, RemovalPolicy } from "aws-cdk-lib/core";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import * as aws_s3_assets from "aws-cdk-lib/aws-s3-assets";
import * as iam from "aws-cdk-lib/aws-iam";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as apprunner from "aws-cdk-lib/aws-apprunner";

const BACKEND_PATH = "backend";
const ECR_REPOSITORY_NAME = "backend-repository";
const IMAGE_TAG = "latest";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.init();
  }

  private init() {
    const codeBuildRole = this.createRole("BackendCodeBuildRole", "codebuild.amazonaws.com");
    const appRunnerRole = this.createRole("AppRunnerRole", "build.apprunner.amazonaws.com");

    const ecrRepository = this.createEcrRepository(codeBuildRole, appRunnerRole);
    const sourceAsset = this.uploadSourcesToS3(codeBuildRole);

    const codeBuildProject = this.createCodeBuildProject(codeBuildRole, sourceAsset, ecrRepository);

    this.createAppRunnerService(appRunnerRole, ecrRepository);
    this.createOutputs(ecrRepository, codeBuildProject);
  }

  /**
   * Create IAM role
   * @param id
   * @param servicePrincipal
   * @returns
   */
  createRole(id: string, servicePrincipal: string): iam.Role {
    return new iam.Role(this, id, {
      assumedBy: new iam.ServicePrincipal(servicePrincipal),
    });
  }

  /**
   * Create ECR repository
   * @param codeBuildRole
   * @param appRunnerRole
   * @returns
   */
  createEcrRepository(codeBuildRole: iam.Role, appRunnerRole: iam.Role): ecr.Repository {
    const repository = new ecr.Repository(this, "BackendRepository", {
      repositoryName: ECR_REPOSITORY_NAME,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    repository.grantPullPush(codeBuildRole);
    repository.grantPull(appRunnerRole);

    return repository;
  }

  /**
   * Upload code to s3
   * @param role
   * @returns
   */
  uploadSourcesToS3(role: iam.Role): aws_s3_assets.Asset {
    const asset = new aws_s3_assets.Asset(this, "BackendSourceAsset", {
      path: BACKEND_PATH,
    });

    asset.grantRead(role);

    return asset;
  }

  /**
   * Create code build
   * @param role
   * @param sourceAsset
   * @param ecrRepository
   * @returns
   */
  createCodeBuildProject(
    role: iam.Role,
    sourceAsset: aws_s3_assets.Asset,
    ecrRepository: ecr.Repository
  ): codebuild.Project {
    const environment = this.createBuildEnvironment();

    const buildSpec = this.createBuildSpec(ecrRepository);

    const source = codebuild.Source.s3({
      bucket: sourceAsset.bucket,
      path: sourceAsset.s3ObjectKey,
    });

    return new codebuild.Project(this, "BackendCodeBuildProject", {
      role,
      environment,
      source,
      buildSpec,
    });
  }

  /**
   * Create App runner service
   * @param role
   * @param ecrRepository
   */
  createAppRunnerService(role: iam.Role, ecrRepository: ecr.Repository) {
    const appRunnerService = new apprunner.CfnService(this, "BackendServiceAppRunner", {
      serviceName: "backend-service-node-app-runner",
      sourceConfiguration: {
        authenticationConfiguration: {
          accessRoleArn: role.roleArn,
        },
        imageRepository: {
          imageIdentifier: `${ecrRepository.repositoryUri}:${IMAGE_TAG}`,
          imageRepositoryType: "ECR",
          imageConfiguration: {
            port: "3000",
            startCommand: "node src/index.js",
          },
        },
        autoDeploymentsEnabled: false, // disable auto-deploy until image exists
      },
      instanceConfiguration: {
        cpu: "1 vCPU",
        memory: "2 GB",
      },
    });
  }

  /**
   * Get build env options
   * @returns
   */
  createBuildEnvironment(): codebuild.BuildEnvironment {
    return {
      buildImage: codebuild.LinuxBuildImage.STANDARD_6_0,
      privileged: true,
      environmentVariables: {
        NODE_ENV: {
          value: "production",
          type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
        },
        AWS_DEFAULT_REGION: {
          value: this.region,
          type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
        },
      },
    };
  }

  /**
   * Get build spec
   * @param ecrRepository
   * @returns
   */
  createBuildSpec(ecrRepository: ecr.Repository): codebuild.BuildSpec {
    return codebuild.BuildSpec.fromObject({
      version: "0.2",
      env: {
        variables: {
          ECR_REPOSITORY_URI: ecrRepository.repositoryUri,
          IMAGE_TAG: IMAGE_TAG,
          AWS_DEFAULT_REGION: this.region,
        },
      },
      phases: {
        pre_build: {
          commands: [
            "echo Logging in to Amazon ECR...",
            `aws ecr get-login-password --region ${this.region} | docker login --username AWS --password-stdin ${ecrRepository.repositoryUri}`,
          ],
        },
        build: {
          commands: [
            "echo Building the Docker image...",
            `docker build -t ${ecrRepository.repositoryUri}:${IMAGE_TAG} .`,
            "echo Tagging the Docker image...",
            `docker tag ${ecrRepository.repositoryUri}:${IMAGE_TAG}`,
          ],
        },
        post_build: {
          commands: ["echo Pushing the Docker image...", `docker push ${ecrRepository.repositoryUri}:${IMAGE_TAG}`],
        },
      },
    });
  }

  /**
   * Create CLI output
   * @param ecrRepository
   * @param codeBuildProject
   */
  createOutputs(ecrRepository: ecr.Repository, codeBuildProject: codebuild.Project): void {
    new CfnOutput(this, "EcrRepositoryUri", {
      value: ecrRepository.repositoryUri,
      description: "ECR repository URI for backend Docker images",
    });

    new CfnOutput(this, "CodeBuildProjectName", {
      value: codeBuildProject.projectName,
      description: "CodeBuild project name",
    });
  }
}
