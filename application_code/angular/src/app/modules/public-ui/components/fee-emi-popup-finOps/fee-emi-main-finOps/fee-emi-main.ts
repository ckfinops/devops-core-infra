// component-a.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  FeeEMIFinOpsComponent } from '../fee.emi.component';

@Component({
  selector: 'fee-emi-main-finOps',
  templateUrl: './fee-emi-main.html',
  styleUrls: ['./fee-emi-main.css']
})
export class FeeEMIfinOpsMain {
  constructor(public dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(FeeEMIFinOpsComponent, {
      width: '100%',
      data: { /* Pass data if needed */ }
    });
  }
}
