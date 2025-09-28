import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';
// import { RegulardownloadformComponent } from '../../finops/regularCCdownload/regularcontent';

@Component({
  selector: 'devsecopsmobilecc',
  templateUrl: './devsecopsmobilecc.component.html',
  styleUrls: ['./devsecopsmobilecc.component.css']
})
export class DevSecopsmobileccComponent {

  courses = [
    {
      title: 'DevOps',
      modules: [
        // Course 2 modules and submodules
        // Module 1
        {
          title: 'OS - Windows & Unix/Linux',
          submodules: [
            'Unix & Linux History & Distributions',
            'Basic & Advanced Commands',
            'Run Levels',
            'Boot Process',
            'File System',
            'File & Directory Management',
            'Text Editors',
            'Permissions',
            'User & Group Management',
            'Package Management',
            'Controlling Services & Daemons',
            'Process Management',
            'Log Management',
            'WebServer - Windows IIS, Apache2, Nginx & Httpd',
            'Database Servers - MySQL, Mariadb & PostgreSQL',
          ]
        },
        {
          title:'AWS Cloud Module',
          submodules:[

'Container',
'Database',
'Storage',
'Developer Tools',
'Management and Governance',
'Networking and Content Delivery',
'Security, Identity, and Compliance',
'Serverless'
          ]
        },
        {
          title:'Azure Cloud Module',
          submodules:[
'Compute',
'Container',
'Database',
'Storage',
'Azure DevOps',
'Networking',
'Identity and Security',
'Serverless'
          ]
        },
        {
          title:'GCP Cloud Module',
          submodules:[
'Infrastructure', 
'Container',
'Database',
'Storage',
'Developer Tools',
'Management Tools',
'Identity & Security Services'
          ]
        },
        {
          title:'DevOps - Software Development Life Cycle: Agile - Scrum',
          submodules:[
            'Getting Started with SDLC',
            'What is Agile?',
            'Agile Manifesto (4 Values & 12 Principles)',
            'What is Scrum?',
            'Agile Scrum Roles',
            'Agile Scrum Ceremonies:',
            '  - Sprint Planning',
            '  - Daily Standup',
            '  - Sprint Backlog Refinement',
            '  - Sprint Review',
            '  - Sprint Retrospective',
            'Product Backlog Grooming',
            'Agile Scrum Artefacts',
            'Agile Scrum Board',
            'Create a Sprint using Jira/Azure Boards:',
            '  - Create Epic',
            '  - Create Story',
            '  - Create a Task',
            'Summary'
          ]
        },
        {
          title:'DevOps - Build Tool: Apache Maven & Python Pip',
          submodules:[
            'Overview of Build Tools:',
            '  - Maven',
            '  - Gradle',
            '  - Ant',
            '  - Pip',
            'Getting Started with Build Tools i.e. Maven',
            'Maven Lifecycles & Phases',
            'Maven Plugins & Repository',
            'Understanding the pom.xml & Settings.xml files',
            'Build Java Code using Maven Lifecycles',
            'Jfrog Integration with pom.xml',
            'SonarQube Integration with pom.xml',
            'Summary'
          ]
        },
        {
          title:'DevOps - Application Servers - Apache Tomcat',
          submodules:[
            'Overview of Application Servers',
            'Getting Started with Apache Tomcat:',
            '  - Download, Installing and Configuring Apache Tomcat',
            '  - Enable Tomcat Pages Globally',
            '  - Configure Roles, Users, & Password in Apache Tomcat',
            '  - Deploy Code in Apache Tomcat using GUI',
            '  - Deploy Code in Apache Tomcat using Jenkins Pipeline',
            'Summary'
          ]
        },
        {
          title:'DevOps - Version Control System / Source Code Management: Git',
          submodules:[
            'Getting Started with VCS/SCM',
            'What is Git, AWS CodeCommit, and GitHub?',
            'About Version Control Systems and Types',
            'Git Workflow',
            'Installing Git on Windows & Linux',
            'Getting Started with Git Commands',
            'Working with Branches',
            'Merging Branches',
            'Creating and Committing a Pull Request',
            'Working with Stash',
            'Summary'
          ]
        },
        {
          title:'DevOps - Overview of Continuous Integration with Jenkins',
          submodules:[
            'Overview of Continuous Integration',
            'Getting Started with Jenkins',
            'Jenkins Architecture',
            'Download, Installing, and Configuring Jenkins',
            'Jenkins Management',
            'Installing Jenkins Plugins',
            'Creating Jenkins Jobs',
            'Creating Jenkins Pipeline Jobs',
            'Summary'
          ]
        },
        {
          title:'DevOps - Continuous Static Code Analysis: SonarQube',
          submodules:[
            'Getting Started with SonarQube',
            'Integrate SonarQube with Pipeline Jenkins & CodeBuild/CodePipeline',
            'Integrate SonarQube with GitHub',
            'Execute Code Quality using SonarQube:',
            '  - Reliability',
            '  - Security',
            '  - Maintainability',
            '  - Security Review',
            '  - Coverage & Duplications',
            'Summary'
          ]
        },
        {
          title:'DevOps - Continuous Binary Code Repository using JFrog',
          submodules:[
            'Getting Started with Continuous Binary Code Repository i.e. JFrog',
            'JFrog Architecture',
            'Download, Installing, and Configuring JFrog',
            'Integrate JFrog with VCS/SCM i.e. POM.xml',
            'Integrate JFrog with Maven',
            'Creating Jenkins Jobs & Publish artifact to JFrog repository',
            'Creating Jenkins Pipeline Jobs & Publish artifact to JFrog repository',
            'Summary'
          ]
        },
        {
          title:'DevOps - Continuous Infrastructure As A Code: Terraform',
          submodules:[
            'Getting Started with Infrastructure as Code (IaC)',
            'Different Vendors Of IaC tools?',
            'What is Terraform?',
            'Core Concepts of Terraform',
            '  - Variables',
            '  - Modules',
            '  - State Files',
            'Create Virtual Machines using Terraform',
            'Create 3 Tier Architecture using Terraform',
            'Summary'
          ]
        },
        {
          title:'DevOps - Creating Machine Images: Packer',
          submodules:[
            'Getting Started with Packer',
            'Install Packer on Windows & Linux',
            'Build an Image',
            'Variables',
            'Builders',
            'Provisioners',
            'Post Provisioners',
            'Executing Shell Scripts',
            'Shell Script',
            'PowerShell Script',
            'Executing Ansible PlayBooks',
            'Summary'
          ]
        },
        {
          title:'DevOps - Continuous Configuration Management: Ansible',
          submodules:[
            'What is Configuration Management?',
            'Different Types Of Configuration Management Tools?',
            'What is Ansible?',
            'History of Ansible',
            'Important terms used in Ansible',
            'Ansible Installation in Linux',
            'Ansible ad-hoc commands',
            'Ansible Playbooks',
            'Ansible Roles',
            'Summary'
          ]
        },
        {
          title:'DevOps - Containerisation: Docker',
          submodules:[
            'What is a Container?',
            'List of Container Vendors',
            'Getting Started with Docker',
            'Docker Product',
            'Docker Architecture',
            'Docker Installation',
            'Docker Hub',
            'Docker Images',
            'Docker Networking',
            'Docker Compose',
            'Summary'
          ]
        },
        {
          title:'DevOps - Container Orchestration: Kubernetes',
          submodules:[
            'What is Cluster Orchestration or Container Orchestration?',
            'Different Types of Container Orchestration Vendors',
            'What is Kubernetes?',
            'Kubernetes Cluster Orchestration Architecture',
            'Kubernetes Components',
            '  - Pods',
            '  - Nodes',
            '  - Service',
            '  - Volume',
            '  - Namespace',
            'Create 3 Node Cluster & Deploy a Simple WebServer (Nginx):',
            '  - Creating Cluster',
            '  - Adding Nodes to Cluster',
            '  - Create Nginx Deployment',
            '  - Create Nginx Service',
            '  - Describe Nginx Deployment',
            '  - Validate Nginx Deployment',
            '  - Access Website using Cluster IP and Node IP',
            'Summary'
          ]
        },
        {
          title:'DevOps - Continuous Monitoring: New Relic',
          submodules:[
            'What is Observability/Monitoring?',
            'Types of Continuous Monitoring:',
            '  - Application Monitoring',
            '  - Infrastructure Monitoring',
            '  - Kubernetes Monitoring',
            '  - Log Management',
            '  - Errors Inbox',
            '  - Browser Monitoring',
            '  - Mobile Monitoring',
            '  - Synthetics Monitoring',
            '  - Network Monitoring',
            'List of Continuous Monitoring Tools',
            'Configure Jobs:',
            '  - Ping Monitoring in NewRelic',
            '  - Simple Browser Monitoring in NewRelic',
            '  - Scripted Monitoring in NewRelic',
            '  - Getting Started with APM in NewRelic',
            '  - Configure APM in NewRelic',
            '  - Configure Infrastructure in NewRelic',
            '  - Creating Dashboard in NewRelic',
            'Summary'
          ]
        },
        {
          title:'DevOps - Migration Strategies',
          submodules:[
            'What is Migration?',
            'Different Types Of Migration Strategies:',
            '  - Rehosting',
            '  - Replatforming',
            '  - Repurchasing',
            '  - Refactoring',
            '  - Retiring',
            '  - Retaining',
            'Summary'
          ]
        },
        {
          title:'DevOps - Deployment Strategies',
          submodules:[
            'What is Deployment?',
            'Different Types of Deployment Strategies:',
            '  - Recreate',
            '  - Ramped',
            '  - Blue/Green',
            '  - Canary',
            '  - A/B testing',
            '  - Shadow',
            'Summary'
          ]
        },
        {
          title:'Python Basics: Introduction',
          submodules:[
            'Keywords and Identifiers',
            'Statements & Comments',
            'Python Variables',
            'Python Datatypes',
            'Python Type Conversion',
            'Python I/O and import',
            'Python Operators',
            'Python Namespace'
          ]
        },
        {
          title:'Python: Functions',
          submodules:[
            'Python Functions',
            'Function Argument',
            'Python Recursion',
            'Anonymous Function',
            'Global, Local, and Nonlocal',
            'Python Global Keyword',
            'Python Modules',
            'Python Package'
          ]
        },
        {
          title:'Python: Object & Class',
          submodules:[
            'Object & Class in Python OOP',
            'Python Class'
          ]
        },
        {
          title:'Python: Data Types',
          submodules:[
            'Python Numbers',
            'Python List',
            'Python Tuple',
            'Python String',
            'Python Set',
            'Python Dictionary'
          ]
        },
        {
          title:'Python: Flow Control',
          submodules:[
            'Python if...else',
            'Python for Loop',
            'Python while Loop',
            'Python break and continue',
            'Python Pass'
          ]
        },
        {
          title:'Python: File Handling',
          submodules:[
            'Python File Operation',
            'Python Directory',
            'Python Exception',
            'Python Exception Handling',
            'Python User-defined Exception'
          ]
        },
        {
          title:'Python: Modules',
          submodules:[
            'Python: Modules:',
            '  - os',
            '  - sys',
            '  - re',
            '  - datetime',
            '  - aws boto3',
            '  - mysql & mysql-connector',
            'Examples:',
            '  - Creating EC2, S3, RDS resource using Boto3 with Python'
          ]
        },
        {
          title:'Shell Scripting',
          submodules:[
            'Introduction to Shell Scripting',
            '  - What is a Shell Script?',
            '  - Importance and applications of Shell Scripts.',
            '  - Basic Shell commands (ls, cd, mkdir, rm, etc.).',
            '  - Introduction to the Bash shell.',
            'Shell Script Basics:',
            '  - Variables in Shell Scripts.',
            '  - Reading user input.',
            '  - Basic Shell operations (arithmetic, string concatenation).',
            'Control Structures and Loops:',
            '  - If-else statements.',
            '  - Case statements.',
            '  - For and while loops.',
            'Advanced Concepts:',
            '  - Functions in Shell Scripts.',
            '  - Introduction to Shell Script debugging.',
            '  - Basic File I/O in Shell Scripts.',
            'Real-world Applications and Best Practices:',
            '  - Overview of real-world applications of Shell Scripts.',
            '  - Best practices in Shell Scripting (commenting, naming conventions).',
            '  - Introduction to script scheduling (cron jobs).'
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