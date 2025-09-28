// component-a.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  FeeEMIAWSComponent } from '../fee.emi.component';

@Component({
  selector: 'fee-emi-main-aws',
  templateUrl: './fee-emi-main.html',
  styleUrls: ['./fee-emi-main.css']
})
export class FeeEMIAWSMain {
  constructor(public dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(FeeEMIAWSComponent, {
      width: '100%',
      data: { /* Pass data if needed */ }
    });
  }
}
