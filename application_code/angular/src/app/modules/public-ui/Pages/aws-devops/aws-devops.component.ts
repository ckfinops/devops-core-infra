import { Component } from '@angular/core';

@Component({
  selector: 'app-aws-devops',
  templateUrl: './aws-devops.component.html',
  styleUrls: ['./aws-devops.component.css']
})
export class AWSDevOpsComponent {
  cloudServices = [
    {
      category: '1. Compute',
      aws: 'EC2, ECS, EKS, Lambda, API Gateway & ASG',
      description: 'Scalable computing resources for your applications'
    },
    {
      category: '2. Storage',
      aws: 'S3, EBS, EFS',
      description: 'Reliable and scalable storage solutions'
    },
    {
      category: '3. Networking',
      aws: 'VPC, ELB, Route 53, & CloudFront',
      description: 'Secure and high-performance networking'
    },
    {
      category: '4. CI/CD',
      aws: 'CodeBuild, CodeDeploy, CodePipeline',
      description: 'Automated software delivery pipelines'
    },
    {
      category: '5. Infrastructure as Code (IaC)',
      aws: 'CloudFormation',
      description: 'Manage infrastructure through code'
    },
    {
      category: '6. Container Services',
      aws: 'ECS, EKS, Fargate',
      description: 'Container orchestration and management'
    },
    {
      category: '7. Monitoring & Logging',
      aws: 'CloudWatch, CloudTrail, X-Ray',
      description: 'Comprehensive monitoring and observability'
    },
    {
      category: '8. Secrets Management',
      aws: 'AWS Secrets Manager, SSM Parameter Store',
      description: 'Secure credential and secret management'
    },
    {
      category: '9. Identity & Access',
      aws: 'IAM',
      description: 'Identity and access management'
    },
    {
      category: '10. Artifact Repositories',
      aws: 'CodeArtifact, ECR',
      description: 'Store and manage build artifacts and containers'
    },
    {
      category: '11. RDBMS & NoSQL',
      aws: 'RDS, DynamoDB, Redshift',
      description: 'Relational and non-relational database services'
    }
  ];

  devOpsTopics = [
    {
      category: '1. Source Code Management',
      tools: 'Git, GitHub, GitLab, Bitbucket, Azure Repos',
      purpose: 'Version control, code collaboration'
    },
    {
      category: '2. CI/CD',
      tools: 'Jenkins',
      purpose: 'Continuous Integration & Deployment automation'
    },
    {
      category: '3. Build Tools',
      tools: 'Maven, Gradle, NPM, Yarn',
      purpose: 'Compile and build software projects'
    },
    {
      category: '4. Artifact Repository',
      tools: 'Nexus, JFrog Artifactory, AWS CodeArtifact',
      purpose: 'Store and manage build artifacts and dependencies'
    },
    {
      category: '5. Containerization',
      tools: 'Docker',
      purpose: 'Create and manage containers'
    },
    {
      category: '6. Container Orchestration',
      tools: 'Kubernetes (K8s)',
      purpose: 'Deploy and manage containerized applications'
    },
    {
      category: '7. Infrastructure as Code',
      tools: 'Terraform',
      purpose: 'Automate infrastructure provisioning'
    },
    {
      category: '8. Configuration Management',
      tools: 'Ansible',
      purpose: 'Automate software configuration and system setup'
    },
    {
      category: '9. Monitoring & Logging',
      tools: 'NewRelic',
      purpose: 'Monitor performance, collect and analyze logs'
    },
    {
      category: '10. Cloud Platforms',
      tools: 'AWS',
      purpose: 'Host applications and infrastructure'
    },
    {
      category: '11. Security & Secrets Mgmt',
      tools: 'HashiCorp Vault, & AWS Secrets Manager',
      purpose: 'Secure credentials, secrets, and access policies'
    },
    {
      category: '12. Code Quality',
      tools: 'SonarQube',
      purpose: 'Code quality and security analysis'
    }
  ];
} 