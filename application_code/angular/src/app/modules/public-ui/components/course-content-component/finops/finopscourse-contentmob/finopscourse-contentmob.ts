import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'finopscourse-contentmob',
  templateUrl: './finopscourse-contentmob.html',
  styleUrls: ['./finopscourse-contentmob.css']
})
export class FinOpsCourseContentMob {

  courses = [
    {
      title: 'Cloud FinOps',
      modules: [
        // Course 2 modules and submodules
        // Module 1
        {
          title: 'Module 1: Introduction to FinOps',
          submodules: [ 'Overview of FinOps and its importance in cloud cost management',
'Understanding the FinOps framework and lifecycle',
'Key concepts:',
'1. Cloud financial management',
'2. Cost visibility, and',
'3. Optimization strategies.',
   'Linux & Unix Distributions',]
                              },
                                
{
  title: 'Module 2: Cloud Computing Platforms',
  submodules: [
    'Detailed exploration of cloud platforms',
    'AWS: Core services, cost management tools, and best practices',
    'Azure: Key services, cost control features, and optimization techniques',
    'GCP: Service overview, pricing models, and cost-saving strategies',
  ]
},
{
  title: 'Module 3: FinOps Tools and Platforms',
  submodules: [
    'Cloud Cost Management Tools:',
'Flexera',
'CloudHealth',
'IBM Apptio',
'ParkMyCloud',
'Turbonomic',
    'Business Intelligence Tools:',
    'Power BI',
    'Tableau',
    'AWS-Specific Cost Management Tools:',
'AWS Trusted Advisor',
'AWS Compute Optimizer',
'AWS Storage Lens',
'S3 Lifecycle Management',
'AWS Storage Gateway',
'CloudWatch Metrics',
'AWS Spot Instance Advisor',
'EC2 Auto Scaling Groups with Spot Instances',
'AWS Global Accelerator',
'AWS Cost Explorer',
'AWS Cost and Usage Report',
'AWS Budgets',
  ]
},

{
  title: 'Module 4: FinOps Roles and Responsibilities',
  submodules: [
    'Roles in FinOps:',
'FinOps Certified Practitioner',
'FinOps Certified Engineer',
'FinOps Certified Professional',
'FinOps Certified FOCUS Analyst',
    'Key Responsibilities:',
'Cloud Cost Management and Optimization',
'Budgeting and Forecasting',
'Financial Reporting and Analysis',
'Collaboration with Cross-Functional Teams',
'Governance and Compliance',
'Tooling and Automation',
'Strategic Advisory',
  ]
},

{
  title: 'Module 5: Practical FinOps',
  submodules: [
    'Hands-on labs using AWS, Azure, and GCP',
'Case studies on cost optimization',
'Implementing tagging strategies and cost allocation',
  ]
},

{
  title: 'Module 6: Collaboration and Communication',
  submodules: [
    'Engaging with key stakeholders:',
    'CIO, CFO, Product Owners',
    'Effective communication of FinOps insights and recommendations.'
  ]
},

          {
            title: 'Module 7: Advanced FinOps Strategies',
            submodules: [
'Defining KPIs and success criteria for cloud cost optimization.',
'Continuous improvement in cloud cost management.',
'Advanced budgeting techniques and variance analysis.'
]
          },

          {
  title: 'Module 8: Certification Preparation',
  submodules: [
    'Exam preparation for FinOps certifications',
    'Practice tests and mock exams',
    'Tips and strategies for passing FinOps certification exams' 
  ]
},

{
  title: 'Job Opportunities in FinOps',
  submodules: [
    'Job Roles:',
'FinOps Certified Practitioner',
'FinOps Certified Engineer',
'FinOps Certified Professional',
'FinOps Certified FOCUS Analyst',
    'Job Description:',
'Analyze and interpret cloud cost data to provide insights and recommendations.',
'Collaborate with cross-functional teams to enforce cost allocation and tagging standards.',
'Monitor budgets, spend, and adherence, and report regularly to stakeholders.',
'Define and track cloud cost optimization KPIs and success criteria.',
'Work closely with finance teams on chargeback and optimization data.',
'Evaluate and propose strategies for continuous cost optimization.',
'Conduct variance analysis to identify further cost-saving opportunities.',
'Provide training on cost optimization best practices.',
'Collaborate with vendors and use third-party tools for enhanced optimization.',
  ]
},

{
  title: 'Certifications & Cost Details',
  submodules: [
    'FinOps Certified Practitioner - Exam Cost: 300 USD', 
    'FinOps Certified Engineer - Exam Cost: 699 USD', 
    'FinOps Certified Professional - Exam Cost: 1,999 USD',
    'FinOps Certified FOCUS Analyst - Exam Cost: 400 USD'



  ]
},
//            {
//             title: 'Reliable MLOps: Scaling and Testing',
//             submodules: ['Scaling and multi-account strategies',
// 'Testing and traffic-shifting',
// 'Demonstration: Using SageMaker Inference Recommender',
// 'Hands-On Lab: Testing Model Variants',
// 'Summary']
//           },

//           {
//   title: 'Reliable MLOps: Scaling and Testing (continued)',
//   submodules: [
// 'Hands-On Lab: Shifting Traffic',
// 'Workbook: Multi-account strategies'
// ]
// },

//           {
//   title: 'Reliable MLOps: Monitoring',
//   submodules: [
// 'The importance of monitoring in ML',
// 'Hands-On Lab: Monitoring a Model for Data Drift',
// 'Operations considerations for model monitoring',
// 'Remediating problems identified by monitoring ML solutions',
// 'Workbook: Reliable MLOps',
// 'Hands-On Lab: Building and Troubleshooting an ML Pipeline'
// ]
// },

          // Module 2
  //         {
  //           title: 'Version Control System / Source Code Management: Git',
  //           submodules: ['Getting Started with VCS/SCM',
  // 'What is Git, AWS CodeCommit and GitHub?',
  // 'About Version Control System and types',
  // 'Git Workflow',
  // 'Installing on Windows & Linux',
  // 'Getting Started with Git Commands',
  // 'Working with Branches',
  // 'Merging Branches',
  // 'Creating and Committing a Pull Request',
  // 'Working with Stash']
  //         },
          // Module 3
          // {
          //   title: 'Continuous Integration : Jenkins',
          //   submodules: ['Overview of Continuous Integration',
          //                 'Getting Started with Jenkins',
          //                 'Jenkins Architecture',
          //                 'Download, Installing, and Configuring Jenkins',
          //                 'Jenkins Management',
          //                 'Installing Jenkins Plugins',
          //                 'Creating Jenkins Jobs',
          //                 'Creating Jenkins Pipeline Jobs',
          //                 'Summary']
          // },
          // Module 4
  //         {
  //           title: 'Continuous Static Code Analysis : SonarQube',
  //           submodules: ['Getting Started with SonarQube',
  // 'Integrate SonarQube with Pipeline Jenkins & CodeBuild/CodePipeline',
  // 'Integrate SonarQube with GitHub',
  // 'Execute Code Quality using SonarQube',
  // 'Reliability',
  // 'Security',
  // 'Maintainability',
  // 'Security Review',
  // 'Coverage & Duplications',
  // 'Summary']
  //         },
          // Module 5
          // {
          //   title: 'Continuous Binary Code Repository using JFrog',
          //   submodules: ['Getting Started',
          //             'Download, Installing, and Configuring JFrog',
          //             'Integrate JFrog with VCS/SCM i.e. POM.xml',
          //             'Integrate JFrog with Maven',
          //             'Creating Jenkins Jobs & Publish artifact to JFrog repository',
          //             'Creating Jenkins Pipeline Jobs & Publish artifact to JFrog repository',
          //             'Summary']
          //                     },
                              
          //  {
          //   title: 'Continuous Infrastructure As A Code: Terraform',
          //   submodules: ['Getting Started with IaC',
          //               'Different Vendors Of IaC tools?',
          //               'What is Terraform?',
          //               'Core Concepts of Terraform',
          //               'Variables',
          //               'Modules',
          //               'State Files',
          //               'Create Virtual Machines using Terraform',
          //               'Create Create 3 Tier Architecture using',
          //               'Terraform',
          //               'Summary']
          // },
          //  {
          // title: 'Creating Machine Images : Packer',
          //   submodules: ['Getting Started with packer',
          //              'Install Packer on Windows & Linux',
          //             'Build an Image',
          //               'Variables',
          //                'Builders',
          //                'Provisioners',
          //                'Post-Provisioners',
          //               'Executing Shell Scripts',
          //                'Shell Script',
          //              'PowerShell Script',
          //               'Executing Ansible PlayBooks',
          //               'Summary']
          //  },
          // {
          //   title: 'Continuous Configuration Management : Ansible',
          //   submodules: ['What is Configuration Management?',
          //               'Different Types of Configuration Management',
          //               'Tools for Configuration Management',
          //               'What is Ansible? ',
          //               'History of Ansible',
          //               'Important Terms Used in Ansible',
          //               'Ansible Installation in Linux',
          //               'Ansible Ad-hoc Commands',
          //               'Ansible Playbooks',
          //               'Ansible Roles',
          //               'Summary']
          // },
          // Module 7
          // {
          //   title: 'Containerisation : Docker',
          //   submodules: ['Getting Started with Containers',
          //             'What is a Container? ',
          //             'List of Container Vendors',
          //             'Getting Started with Docker',
          //             'Docker Product',
          //             'Docker Architecture',
          //             'Docker Installation',
          //             'Docker Hub',
          //             'Docker Images',
          //             'Docker Networking',
          //             'Docker Compose',
          //             'Summary']
          //                     },
          // Module 8
          // {
          //   title: 'Container Orchestration : Kubernates',
          //   submodules: ['What is Cluster Orchestration or Container Orchestration?',
          //             'Different Types of Container Orchestration Vendors',
          //             'What is Kubernetes?',
          //             'Kubernetes Cluster Orchestration Architecture',
          //             'Kubernetes Components (Pods, Nodes, Service, Volume & Namespace)',
          //             'Create a 3-Node Cluster & Deploy a Simple Web Server (Nginx):',
          //             'Creating Cluster',
          //             'Adding Nodes to Cluster',
          //             'Create Nginx Deployment',
          //             'Create Nginx Service',
          //             'Describe Nginx Deployment',
          //             'Validate Nginx Deployment',
          //             'Access Website using Cluster IP and Node IP',
          //             'Summary']
          // },
          // Module 9
          {
            title: 'Project Work ',
            submodules: ['Project-1 : AWS ',
                                      'Project-2 : AZURE ',
                                      'Project-3 : GCP ']
                                              },

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