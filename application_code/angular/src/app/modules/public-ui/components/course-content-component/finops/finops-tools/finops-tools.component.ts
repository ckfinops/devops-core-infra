import { Component } from '@angular/core';
import { DeveopsdownloadformComponent } from '../deveopsdownloadform/deveopsdownloadform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'finops-tools',
  templateUrl: './finops-tools.component.html',
  styleUrls:['./finops-tools.component.css']
})
export class FinOpsToolsComponent {
 
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
