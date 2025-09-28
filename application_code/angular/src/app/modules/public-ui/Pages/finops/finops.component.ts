import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'finops',
  templateUrl: './finops.component.html',
  styleUrls: ['./finops.component.css']
})
export class FinOpsComponent implements OnInit {
  isLoading = false;

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]);
  experience = new FormControl('', [Validators.required]);
  courseInterest = new FormControl('', [Validators.required]);

  registrationForm = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone,
    experience: this.experience,
    courseInterest: this.courseInterest,
  });

  finopsCloudServices = [
    {
      category: '1. Cost Management',
      aws: 'Cost Explorer, Budgets, Cost Anomaly Detection',
      description: 'Monitor, analyze and optimize cloud spending'
    },
    {
      category: '2. Multi-Cloud Cost Optimization',
      aws: 'AWS Cost Optimization Hub, Azure Cost Management, GCP Cost Management',
      description: 'Optimize costs across multiple cloud providers'
    },
    {
      category: '3. Resource Optimization',
      aws: 'Trusted Advisor, Compute Optimizer, Right Sizing',
      description: 'Optimize resource allocation and utilization'
    },
    {
      category: '4. Reserved Instances & Savings Plans',
      aws: 'Reserved Instances, Savings Plans, Spot Instances',
      description: 'Long-term cost savings through capacity planning'
    },
    {
      category: '5. Billing & Reporting',
      aws: 'Cost & Usage Reports, Billing Dashboard, Detailed Billing',
      description: 'Comprehensive billing analysis and reporting'
    },
    {
      category: '6. Governance & Compliance',
      aws: 'Organizations, Control Tower, Config Rules',
      description: 'Financial governance and compliance management'
    },
    {
      category: '7. Automation & Tagging',
      aws: 'Resource Groups, Tag Editor, Lambda for automation',
      description: 'Automated cost allocation and resource tagging'
    },
    {
      category: '8. Forecasting & Planning',
      aws: 'Cost Forecasting, Budget Alerts, Usage Forecasts',
      description: 'Predictive cost analysis and budget planning'
    },
    {
      category: '9. Chargeback & Showback',
      aws: 'Cost Allocation Tags, Billing Dimensions',
      description: 'Internal cost allocation and department billing'
    },
    {
      category: '10. Analytics & Insights',
      aws: 'QuickSight, CloudWatch, Cost Intelligence Dashboards',
      description: 'Advanced analytics and cost intelligence'
    }
  ];

  finopsTools = [
    {
      category: '1. Cloud Cost Management',
      tools: 'CloudHealth, Cloudability, Spot.io, ParkMyCloud',
      purpose: 'Multi-cloud cost optimization and management'
    },
    {
      category: '2. Financial Planning',
      tools: 'Excel, Google Sheets, Tableau, Power BI',
      purpose: 'Financial modeling, budgeting and forecasting'
    },
    {
      category: '3. Cloud Native Tools',
      tools: 'AWS Cost Explorer, Azure Cost Management, GCP Billing',
      purpose: 'Native cloud provider cost management tools'
    },
    {
      category: '4. Automation & Scripting',
      tools: 'Python, PowerShell, Terraform, CloudFormation',
      purpose: 'Automate cost optimization and resource management'
    },
    {
      category: '5. Monitoring & Alerting',
      tools: 'CloudWatch, Azure Monitor, Stackdriver, DataDog',
      purpose: 'Real-time cost monitoring and anomaly detection'
    },
    {
      category: '6. Collaboration Tools',
      tools: 'Slack, Microsoft Teams, Jira, Confluence',
      purpose: 'Cross-functional team collaboration and communication'
    },
    {
      category: '7. Data Analysis',
      tools: 'SQL, R, Python Pandas, Jupyter Notebooks',
      purpose: 'Advanced data analysis and cost insights'
    },
    {
      category: '8. Visualization',
      tools: 'Grafana, Kibana, Looker, Custom Dashboards',
      purpose: 'Cost data visualization and reporting'
    },
    {
      category: '9. ITFM Tools',
      tools: 'Apptio, ServiceNow ITFM, BMC TrueSight',
      purpose: 'IT Financial Management and cost allocation'
    },
    {
      category: '10. AI/ML for Cost Optimization',
      tools: 'AWS Forecast, Azure Machine Learning, AutoML',
      purpose: 'Predictive analytics for cost optimization'
    }
  ];

  constructor(private elementRef: ElementRef, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    console.log('FinOps Cloud Services:', this.finopsCloudServices);
    console.log('FinOps Tools:', this.finopsTools);
  }

  scrollToTrendingCourses() {
    const trendingCourses = this.elementRef.nativeElement.querySelector('#trending-courses');
    if (trendingCourses) {
      trendingCourses.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true; // Start loading
      
      // Clear the form after submission
      this.registrationForm.reset();
      this.router.navigate(['/thank-you']);
      
      const message = `Hi, I'm interested in your course. Can you provide me with more details?\n`;
      const whatsappURL = `https://api.whatsapp.com/send/?phone=919100073006&text=${encodeURIComponent(message)}`;
  
      // Redirect directly to WhatsApp API endpoint
      window.location.href = whatsappURL;
  
      this.isLoading = false; // Stop loading
    }
  }
}
