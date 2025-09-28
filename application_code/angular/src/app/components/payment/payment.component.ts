import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  bankDetails = {
    accountNumber: '41352788357',
    accountName: 'Cloudbinary',
    bankName: 'SBI',
    ifscCode: 'SBIN0020308',
    branch: 'Umesh Chandra Statue, Sanjeeva Reddy Nagar',
    address: '254, 255 / 3Rt, Sanjeeva Reddy Nagar Mai, Road, Hyderabad, Umesh Chandra Statue, Telangana (TEL), 500038'
  };

  companyDetails = {
    phone: '+91 9392743006',
    email: 'info@cloudbinary.in',
    website: 'https://cloudbinary.in',
    address: 'LP Towers, 2nd Floor, Plot no 56, Hitech City Rd HUDA Techno Enclave, Madhapur, Hyderabad, Telangana 500081.'
  };

  trainerDetails = {
    name: 'Kesav Kummari',
    phone: '+91 9392743006'
  };
} 