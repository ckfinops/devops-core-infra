import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fee-emi-popup-finOps',
  templateUrl: './fee.emi.component.html',
  styleUrls: ['./fee.emi.component.css'] 
})
export class FeeEMIFinOpsComponent {
  constructor(public dialogRef: MatDialogRef<FeeEMIFinOpsComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
