import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'aws-course-content',
  templateUrl: './aws-course-content.component.html',
  styleUrls: ['./aws-course-content.component.css']
})
export class AWSCourseContentComponent {
  constructor(public dialog: MatDialog) {}
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
  toggleTable() {
    const tableContainer = document.getElementById("table-container");
    const tableIntenseContainer = document.getElementById("table-container-intense");
    if (tableContainer) {
      // Toggle the visibility of the table
      if (tableContainer.style.display === "none" || tableContainer.style.display === "") {
        tableContainer.style.display = "block";
        if(tableIntenseContainer)
        tableIntenseContainer.style.display = "none";
      } else {
        tableContainer.style.display = "none";
        if(tableIntenseContainer)
        tableIntenseContainer.style.display = "none";
      }
    }
  } 
  toggleTable_intense() {
  const tableContainer = document.getElementById("table-container");
    const tableIntenseContainer = document.getElementById("table-container-intense");
    console.log("Intense Table Function")
    if (tableIntenseContainer) {
      // Toggle the visibility of the table
      if (tableIntenseContainer.style.display === "none" || tableIntenseContainer.style.display === "") {
        tableIntenseContainer.style.display = "block";
        if(tableContainer)
        tableContainer.style.display="none";
      } else {
        tableIntenseContainer.style.display = "none";
        if(tableContainer)
        tableContainer.style.display="none"
      }
    }
  } 
  
}