import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';
// import { RegulardownloadformComponent } from '../../finops/regularCCdownload/regularcontent';

@Component({
  selector: 'data-science-ccmb', //ccmb course content mobile view
  templateUrl: './data-science-ccmb.html',
  styleUrls: ['./data-science-ccmb.css']
})
export class DataScienceCCMBComponent {

  courses = [
    {
      title: 'Data Science',
      modules: [
        // data-science modules and submodules
        // Module 1
        {
          title: 'Data Engineering (Foundation for All Roles)',
          'submodules': [
            'Data Architecture (Batch vs. Streaming Processing)',
            'SQL Fundamentals & Query Optimization (MySQL/PostgreSQL)',
            'Data Modeling & Normalization',
            'ETL & Data Pipelines (Building from Scratch)',
            'Handling Big Data with Apache Spark (PySpark Basics)',
            'Introduction to Cloud Data Storage (S3, Delta Lake)',
          ]
        },
        {
          'title': 'Data Analytics (Turning Raw Data into Insights)',
          'submodules': [
            'Data Cleaning & Preprocessing',
            'Exploratory Data Analysis (EDA) Techniques',
            'Statistics for Data Analysis (Hypothesis Testing, A/B Testing)',
            'Data Visualization & Storytelling',
            'Dashboarding with Tableau, Power BI & Excel',
            'Writing SQL Queries for Business Analytics',
          ]
        },
        {
          'title': 'MLOps Engineer (Bridging ML & Production)',
          'submodules': [
            'ML Lifecycle & Model Deployment Strategies',
            'Model Versioning & Experiment Tracking with MLflow',
            'Data Pipeline Automation with Apache Airflow',
            'Continuous Training & Retraining (Data Drift Handling)',
            'Docker & Kubernetes for ML Deployment',
            'CI/CD for ML Pipelines',
            'Introduction to Vector Databases & Feature Stores',
          ]
        },
        {
          'title': 'Data Science (Advanced AI & Predictive Modeling)',
          'submodules': [
            'Supervised & Unsupervised Learning',
            'Feature Engineering & Selection',
            'Hyperparameter Tuning & Model Optimization',
            'Ensemble Learning (Boosting, Bagging)',
            'Time Series Forecasting',
            'NLP & Computer Vision Basics',
            'Explainability in ML Models',
          ]
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