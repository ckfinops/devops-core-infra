import { Component } from '@angular/core';

@Component({
  selector: 'app-devops-course',
  templateUrl: './devops-course.component.html',
  styleUrls: ['./devops-course.component.css']
})
export class DevOpsCourseComponent {
  cloudServices = [
    {
      category: '1. Compute',
      aws: 'EC2, ECS, EKS, Lambda, API Gateway & ASG',
      azure: 'VM Scale Sets, AKS, Azure Functions',
      gcp: 'GCE, GKE, Cloud Functions'
    },
    {
      category: '2. Storage',
      aws: 'S3, EBS, EFS',
      azure: 'Blob Storage, Disk Storage, File Share',
      gcp: 'Cloud Storage, Persistent Disk'
    },
    {
      category: '3. Networking',
      aws: 'VPC, ELB, Route 53, & CloudFront',
      azure: 'VNet, Load Balancer, DNS Zone',
      gcp: 'VPC, Cloud Load Balancing, Cloud DNS'
    },
    {
      category: '4. CI/CD',
      aws: 'CodeBuild, CodeDeploy, CodePipeline',
      azure: 'Azure Repos, Pipelines, Artifacts',
      gcp: 'Cloud Source Repos, Cloud Build, Cloud Deploy'
    },
    {
      category: '5. Infrastructure as Code (IaC)',
      aws: 'Terraform',
      azure: 'ARM Templates, Bicep, Terraform',
      gcp: 'Deployment Manager, Terraform'
    },
    {
      category: '6. Container Services',
      aws: 'ECS, EKS, Fargate',
      azure: 'AKS, ACI',
      gcp: 'GKE, Cloud Run'
    },
    {
      category: '7. Monitoring & Logging',
      aws: 'CloudWatch, CloudTrail, X-Ray',
      azure: 'Azure Monitor, Log Analytics, App Insights',
      gcp: 'Stackdriver (Cloud Monitoring, Logging)'
    },
    {
      category: '8. Secrets Management',
      aws: 'AWS Secrets Manager, SSM Parameter Store',
      azure: 'Azure Key Vault',
      gcp: 'Secret Manager'
    },
    {
      category: '9. Identity & Access',
      aws: 'IAM',
      azure: 'Azure AD, RBAC',
      gcp: 'IAM'
    },
    {
      category: '10. Artifact Repositories',
      aws: 'CodeArtifact, ECR',
      azure: 'Azure Artifacts, ACR',
      gcp: 'Artifact Registry, Container Registry'
    },
    {
      category: '11. Security & Compliance',
      aws: 'AWS Config, GuardDuty, Inspector',
      azure: 'Defender for Cloud, Azure Policy',
      gcp: 'Security Command Center, Forseti'
    },
    {
      category: '12. Dev/Test Automation',
      aws: 'AWS CodePipeline, AWS Device Farm',
      azure: 'Azure DevTest Labs',
      gcp: 'Cloud Build Triggers, Test Lab'
    },
    {
      category: '13. Messaging & Queues',
      aws: 'SQS, SNS, EventBridge',
      azure: 'Azure Service Bus, Event Grid, Queue Storage',
      gcp: 'Pub/Sub, Eventarc'
    },
    {
      category: '14. Database (DevOps focus)',
      aws: 'RDS, DynamoDB',
      azure: 'Azure SQL, Cosmos DB',
      gcp: 'Cloud SQL, Firestore'
    },
    {
      category: '15. Observability',
      aws: 'CloudWatch Dashboards',
      azure: 'Azure Monitor Dashboards',
      gcp: 'Cloud Monitoring Dashboards'
    },
    {
      category: '16. Cost Management',
      aws: 'AWS Budgets, Cost Explorer',
      azure: 'Azure Cost Management',
      gcp: 'Billing Reports, Cost Table'
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
      tools: 'Jenkins, GitHub Actions, GitLab CI/CD, Azure Pipelines, AWS CodePipeline, CircleCI',
      purpose: 'Continuous Integration & Deployment automation'
    },
    {
      category: '3. Build Tools',
      tools: 'Maven, Gradle, NPM, Yarn',
      purpose: 'Compile and build software projects'
    },
    {
      category: '4. Artifact Repository',
      tools: 'Nexus, JFrog Artifactory, AWS CodeArtifact, Azure Artifacts',
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
      tools: 'Terraform, Pulumi, AWS CloudFormation, Azure Bicep, Ansible',
      purpose: 'Automate infrastructure provisioning'
    },
    {
      category: '8. Configuration Management',
      tools: 'Ansible',
      purpose: 'Automate software configuration and system setup'
    },
    {
      category: '9. Monitoring & Logging',
      tools: 'Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, Datadog',
      purpose: 'Monitor performance, collect and analyze logs'
    },
    {
      category: '10. Cloud Platforms',
      tools: 'AWS, Azure, GCP',
      purpose: 'Host applications and infrastructure'
    },
    {
      category: '11. Security & Secrets Mgmt',
      tools: 'HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, SOPS',
      purpose: 'Secure credentials, secrets, and access policies'
    },
    {
      category: '12. Testing',
      tools: 'Selenium, JUnit, TestNG, Postman',
      purpose: 'Automate unit, integration, and API testing'
    },
    {
      category: '13. GitOps',
      tools: 'Argo CD, Flux',
      purpose: 'Continuous delivery using Git as the single source of truth'
    },
    {
      category: '14. Observability & APM',
      tools: 'New Relic, AppDynamics, Dynatrace, OpenTelemetry',
      purpose: 'Application performance monitoring and tracing'
    },
    {
      category: '15. Message Queues & Events',
      tools: 'RabbitMQ, Kafka, AWS SQS/SNS, Azure Service Bus',
      purpose: 'Messaging systems for decoupled architecture'
    },
    {
      category: '16. Dev/Test Environments',
      tools: 'Vagrant, Docker Compose, Minikube',
      purpose: 'Local development and testing environments'
    },
    {
      category: '17. Collaboration Tools',
      tools: 'Jira, Confluence, Slack, MS Teams',
      purpose: 'Agile planning, documentation, and team communication'
    },
    {
      category: '18. Cost & Usage Mgmt',
      tools: 'CloudHealth, AWS Cost Explorer, Azure Cost Management',
      purpose: 'Monitor and optimize cloud spending'
    }
  ];
} 