import { Component } from '@angular/core';

@Component({
  selector: 'app-azure-devops',
  templateUrl: './azure-devops.component.html',
  styleUrls: ['./azure-devops.component.css']
})
export class AzureDevOpsComponent {
  cloudServices = [
    {
      category: '1. Compute',
      azure: 'VM Scale Sets, AKS, Azure Functions',
      description: 'Scalable computing resources for your applications'
    },
    {
      category: '2. Storage',
      azure: 'Blob Storage, Disk Storage, File Share',
      description: 'Reliable and scalable storage solutions'
    },
    {
      category: '3. Networking',
      azure: 'VNet, Load Balancer, DNS Zone',
      description: 'Secure and high-performance networking'
    },
    {
      category: '4. CI/CD',
      azure: 'Azure Repos, Pipelines, Artifacts',
      description: 'Automated software delivery pipelines'
    },
    {
      category: '5. Infrastructure as Code (IaC)',
      azure: 'ARM Templates, & Bicep',
      description: 'Manage infrastructure through code'
    },
    {
      category: '6. Container Services',
      azure: 'AKS, ACI',
      description: 'Container orchestration and management'
    },
    {
      category: '7. Monitoring & Logging',
      azure: 'Azure Monitor, Log Analytics, App Insights',
      description: 'Comprehensive monitoring and observability'
    },
    {
      category: '8. Secrets Management',
      azure: 'Azure Key Vault',
      description: 'Secure credential and secret management'
    },
    {
      category: '9. Identity & Access',
      azure: 'Azure AD, RBAC',
      description: 'Identity and access management'
    },
    {
      category: '10. Artifact Repositories',
      azure: 'Azure Artifacts, ACR',
      description: 'Store and manage build artifacts and containers'
    },
    {
      category: '11. RDBMS & NoSQL',
      azure: 'Cosmos DB, SQL DB',
      description: 'Relational and non-relational database services'
    }
  ];

  devOpsTopics = [
    {
      category: '1. Source Code Management',
      tools: 'Git, GitHub, GitLab, Bitbucket, Azure Repos, Azure Repos',
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
      tools: 'Nexus, JFrog Artifactory, Azure Artifacts',
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
      tools: 'Azure',
      purpose: 'Host applications and infrastructure'
    },
    {
      category: '11. Security & Secrets Mgmt',
      tools: 'HashiCorp Vault, & Azure Key Vault',
      purpose: 'Secure credentials, secrets, and access policies'
    },
    {
      category: '12. Code Quality',
      tools: 'SonarQube',
      purpose: 'Code quality and security analysis'
    }
  ];
}
