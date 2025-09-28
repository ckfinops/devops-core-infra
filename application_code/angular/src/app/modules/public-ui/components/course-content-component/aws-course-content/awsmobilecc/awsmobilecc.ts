import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';
// import { RegulardownloadformComponent } from '../../finops/regularCCdownload/regularcontent';

@Component({
  selector: 'awsmobilecc',
  templateUrl: './awsmobilecc.html',
  styleUrls: ['./awsmobilecc.css']
})
export class AWSMobileCourseContent {

  courses = [
    {
      title: 'AWS',
      modules: [
        // Course 2 modules and submodules
        // Module 1
        // {
        //   title:'OS - Windows & Unix/Linux',
        //   submodules:['Unix & Linux History & Distributions',
        //     'Basic & Advanced Commands',
        //     'Run Levels',
        //     'Boot Process',
        //     'File System',
        //     'File & Directory Management',
        //     'Text Editors',
        //     'Permissions',
        //     'User & Group Management',
        //     'Package Management',
        //     'Controlling Services & Daemons',
        //     'Process Management',
        //     'Log Management',
        //     'WebServer - Windows IIS, Apache2, Nginx & Httpd',
        //     'Database Servers - MySQL, Mariadb & PostgreSQL'
        //   ]
        // },
        {
          title:'AWS - Analytics Services',
          submodules:['Amazon Athena',
            'Amazon OpenSearch Service',
            'Amazon QuickSight',
            'Amazon EMR',
            'Amazon Kinesis Data Firehose',
            'Amazon Kinesis Data Streams'
          ]
        },
        {
          title:'AWS - Application Integration',
          submodules:['Amazon EventBridge (Amazon CloudWatch Events)',
            'Amazon AppFlow'
          ]
        },
        {
          title:'AWS - Compute',
          submodules:['AWS App Runner',
            'Amazon EC2',
            'Amazon EC2 Auto Scaling',
            'EC2 Image Builder',
            'AWS Elastic Beanstalk',
            'AWS Serverless Application Repository'
          ]
        },
        {
          title:'AWS - Container Services',
          submodules:['AWS App2Container',
            'AWS Copilot',
            'Amazon EKS Distro',
            'Amazon Elastic Container Registry (Amazon ECR)',
            'Amazon Elastic Container Service (Amazon ECS)',
            'Amazon Elastic Kubernetes Service (Amazon EKS)',
            'AWS Fargate',
            'Red Hat OpenShift Service on AWS (ROSA)'
          ]
        },
        {
          title:'AWS - Database Services',
          submodules:['Amazon Aurora',
            'Amazon Aurora Serverless v2',
            'AWS Database Migration Service (AWS DMS)',
            'Amazon DocumentDB (with MongoDB compatibility)',
            'Amazon DynamoDB',
            'Amazon ElastiCache',
            'Amazon MemoryDB for Redis',
            'Amazon RDS',
            'Amazon Redshift'
          ]
        },
        {
          title:'AWS - Storage Services',
          submodules:[
            'AWS Backup',
            'Amazon Elastic Block Store (Amazon EBS)',
            'AWS Elastic Disaster Recovery (CloudEndure Disaster Recovery)',
            'Amazon Elastic File System (Amazon EFS)',
            'Amazon FSx',
            'Amazon S3',
            'Amazon S3 Glacier',
            'AWS Storage Gateway'
          ]
        },
        {
          title:'AWS - Developer Tools',
          submodules:[
            'AWS Cloud Development Kit (AWS CDK)',
            'AWS CloudShell',
            'AWS CodeArtifact',
            'AWS CodeBuild',
            'AWS CodeCommit',
            'AWS CodeDeploy',
            'Amazon CodeGuru',
            'AWS CodePipeline',
            'AWS CodeStar',
            'AWS Command Line Interface (AWS CLI)',
            'AWS SDKs and Tools',
            'AWS X-Ray'
          ]
        },
        {
          title:'AWS - Management and Governance',
          submodules:[
            'AWS Auto Scaling',
            'AWS CloudFormation',
            'AWS CloudTrail',
            'Amazon CloudWatch',
            'Amazon CloudWatch Logs',
            'AWS Compute Optimizer',
            'AWS Config',
            'AWS Control Tower',
            'AWS Health',
            'AWS License Manager',
            'AWS OpsWorks',
            'AWS Organizations',
            'AWS Personal Health Dashboard',
            'AWS Resilience Hub',
            'AWS Systems Manager',
            'AWS Trusted Advisor'
          ]
        },
        {
          title:'AWS - Networking and Content Delivery',
          submodules:[
            'Amazon API Gateway',
            'AWS Client VPN',
            'Amazon CloudFront',
            'Elastic Load Balancing (ELB)',
            'AWS PrivateLink',
            'Amazon Route 53',
            'AWS Site-to-Site VPN',
            'AWS Transit Gateway',
            'Amazon VPC'
          ]
        },
        {
          title:'AWS - Security, Identity, and Compliance',
          submodules:[
            'AWS Certificate Manager (ACM)',
            'AWS CloudHSM',
            'Amazon Cognito',
            'Amazon Detective',
            'AWS Directory Service',
            'Amazon GuardDuty',
            'AWS Identity and Access Management (IAM)',
            'Amazon Inspector',
            'AWS Key Management Service (AWS KMS)',
            'Amazon Macie',
            'AWS Network Firewall',
            'AWS Resource Access Manager (AWS RAM)',
            'AWS Secrets Manager',
            'AWS Security Hub',
            'AWS Security Token Service (AWS STS)',
            'AWS Shield',
            'AWS Single Sign-On',
            'AWS WAF'
          ]
        },
        {
          title:'AWS - Serverless',
          submodules:[
            'AWS Lambda',
            'Amazon API Gateway',
            'AWS Step Functions',
            'Amazon Simple Email Service (SES)',
            'Amazon Simple Notification Service (Amazon SNS)',
            'Amazon Simple Queue Service (Amazon SQS)'
          ]
        }
      ]
    }

    // You can add more courses here if needed
  ];

  isCourseVisible: boolean[] = new Array(this.courses.length).fill(false);
  isModuleVisible: boolean[][] = [];

  constructor(public dialog: MatDialog) {
    this.courses.forEach((course) => {
      this.isModuleVisible.push(new Array(course.modules.length).fill(false));
    });
  }

  toggleCourseModules(courseNumber: number): void {
    this.isCourseVisible[courseNumber] = !this.isCourseVisible[courseNumber];
  }

  toggleModuleSubmodules(courseNumber: number, moduleNumber: number): void {
    this.isModuleVisible[courseNumber][moduleNumber] = !this.isModuleVisible[courseNumber][moduleNumber];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeveopsdownloadformComponent, {
      data: { /* optional data to pass to the dialog component */ },
      disableClose: true // Prevent closing on backdrop click
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Perform any necessary actions after the dialog is closed
    });
  }

}