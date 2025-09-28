import { Component } from '@angular/core';

@Component({
  selector: 'app-gitops',
  templateUrl: './gitops.component.html',
  styleUrls: ['./gitops.component.css']
})
export class GitOpsComponent {
  gitOpsConcepts = [
    {
      category: '1. Git as Single Source of Truth',
      description: 'All infrastructure and application configurations stored in Git repositories',
      tools: 'Git, GitHub, GitLab, Bitbucket, Azure Repos'
    },
    {
      category: '2. Declarative Configuration',
      description: 'Define desired state of infrastructure and applications',
      tools: 'YAML, JSON, Helm Charts, Kustomize'
    },
    {
      category: '3. Automated Deployment',
      description: 'Automated synchronization between Git and target environments',
      tools: 'ArgoCD & Flux, Tekton'
    },
    {
      category: '4. Continuous Monitoring',
      description: 'Real-time monitoring and alerting for drift detection',
      tools: 'Prometheus, Grafana, AlertManager'
    },
    {
      category: '5. Rollback Capability',
      description: 'Easy rollback to previous versions through Git history',
      tools: 'Git revert, ArgoCD rollback, Flux rollback'
    }
  ];

  gitOpsTools = [
    {
      category: '1. GitOps Operators',
      tools: 'ArgoCD & Flux',
      purpose: 'Automate deployment and synchronization'
    },
    {
      category: '2. Container Orchestration',
      tools: 'Kubernetes & OpenShift',
      purpose: 'Manage containerized applications'
    },
    {
      category: '3. Infrastructure as Code',
      tools: 'Terraform',
      purpose: 'Define infrastructure in code'
    },
    {
      category: '4. Configuration Management',
      tools: 'Helm & Kustomize',
      purpose: 'Manage application configurations'
    },
    {
      category: '5. CI/CD Pipelines',
      tools: 'GitHub Actions, GitLab CI, Jenkins',
      purpose: 'Automate build and test processes'
    },
    {
      category: '6. Monitoring & Observability',
      tools: 'Prometheus & Grafana',
      purpose: 'Monitor applications and infrastructure'
    },
    {
      category: '7. Security & Compliance',
      tools: 'Trivy, & SonarQube',
      purpose: 'Security scanning and policy enforcement'
    },
    {
      category: '8. Multi-Cloud Management',
      tools: 'Terraform',
      purpose: 'Manage resources across multiple clouds'
    },
    {
      category: '9. IaC Linter / Static Code Analysis',
      tools: 'TFLint',
      purpose: 'Focuses on detecting errors and enforcing best practices in Terraform code'
    },
    {
      category: '10. IaC Security Scanner',
      tools: 'TFSec',
      purpose: 'Scans Terraform code for potential security issues and misconfigurations'
    },
    {
      category: '11. IaC Security Scanner',
      tools: 'Checkov',
      purpose: 'Performs static code analysis on Terraform, CloudFormation, Kubernetes, etc., to find security and compliance issues'
    }
  ];

  benefits = [
    {
      title: 'Increased Productivity',
      description: 'Automated deployments reduce manual work and human errors',
      icon: 'fas fa-rocket'
    },
    {
      title: 'Better Security',
      description: 'Git-based security with audit trails and access controls',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'Faster Recovery',
      description: 'Quick rollback capabilities and disaster recovery',
      icon: 'fas fa-undo'
    },
    {
      title: 'Improved Collaboration',
      description: 'Team collaboration through Git workflows and PR reviews',
      icon: 'fas fa-users'
    }
  ];
} 