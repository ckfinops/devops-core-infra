import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fee-emi-popup-aws',
  templateUrl: './fee.emi.component.html',
  styleUrls: ['./fee.emi.component.css'] 
})
export class FeeEMIAWSComponent {
  constructor(public dialogRef: MatDialogRef<FeeEMIAWSComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
