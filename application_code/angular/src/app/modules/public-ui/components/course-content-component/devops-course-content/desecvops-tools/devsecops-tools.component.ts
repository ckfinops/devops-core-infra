import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../../finops/deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'devsecops-tools',
  templateUrl: './devsecops-tools.component.html',
  styleUrls: ['./devsecops-tools.component.css']
})
export class DevSecopsToolsComponent {
 
  constructor(public dialog: MatDialog) { }
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
