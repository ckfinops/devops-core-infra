import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';
// import { RegulardownloadformComponent } from '../../finops/regularCCdownload/regularcontent';

@Component({
  selector: 'data-analyst-ccmb', //ccmb course content mobile view
  templateUrl: './data-analyst-ccmb.html',
  styleUrls: ['./data-analyst-ccmb.css']
})
export class DataAnalystCCMBComponent {

  courses = [
    {
      title: 'Data Analyst',
      modules: [
        // data-analyst modules and submodules
        // Module 1
        {
          title: 'Getting Started With Data Analytics',
          'submodules': [
            'Introduction to Data Analysis',
            'Understanding Data Types and Data Structures',
            'Data Collection Methods',
            'Basic Statistics for Data Analysis',
            'Data Cleaning and Preparation',
            'Capstone Project 1: Data Cleaning and Preparation Project'
          ]
        },
        {
          'title': 'Data Visualisation: Tableau & Power BI',
          'submodules': [
            'Data Visualization Basics',
            'Excel for Data Visualization',
            'Tableau',
            'Power BI',
            'Capstone Project 2: Data Visualization Project with Excel, Tableau, and Power BI'
          ]
        },
        {
          'title': 'SQL for Data Analysis',
          'submodules': [
            'Introduction to SQL',
            'SQL for Data Analysis',
            'Advanced SQL Techniques',
            'Capstone Project 3: SQL Data Analysis Project'
          ]
        },
        {
          'title': 'Basic & Advanced Python for DA',
          'submodules': [
            'Python Basics',
            'Python for Data Analysis',
            'Data Wrangling with Python',
            'Advanced Python Techniques',
            'Capstone Project 4: Python Data Analysis Project'
          ]
        },
        {
          'title': 'Statistical Analysis',
          'submodules': [
            'Inferential Statistics',
            'Hypothesis Testing',
            'Applying Statistical Methods with Python',
            'Capstone Project 5: Statistical Analysis Project'
          ]
        },
        {
          'title': 'Machine Learning Basics',
          'submodules': [
            'Introduction to Machine Learning',
            'Supervised Learning',
            'Unsupervised Learning',
            'Capstone Project 6: Machine Learning Project'
          ]
        },
        {
          'title': 'End-to-End Data Analysis Project',
          'submodules': [
            'Capstone Project 7: End-to-End Data Analysis Project',
            'Real-world Data Analysis Challenge',
            'Final Project Presentation and Course Summary'
          ]
        },
        {
          'title': 'What Next? - Data Engineer, Data Science & MLOps',
          'submodules': [
            'Data Engineer?, Data Science? & MLOps?'
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