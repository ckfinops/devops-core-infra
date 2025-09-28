import { Component, Input } from '@angular/core';

@Component({
  selector: 'course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent {
  @Input() selectedTab: string = 'devsecops'; // Default selected tab
  selectedModule: string | null = null; // Default selected module is null
  showRightColumn: boolean = true; // Initialize to true to show the right column by default
  isModuleSelected: boolean = false; // Initialize to false since module content should be hidden by default

  constructor() {
    // Optionally, you can set other default values or perform any initialization here.
    this.isModuleSelected = false; // Ensure isModuleSelected is initially set to false
  }

  selectTab(tabName: string) {
    this.selectedTab = tabName;
    this.selectedModule = null; // Reset selected module when tab changes
    this.showRightColumn = false; // Hide the right column when changing tabs
    this.isModuleSelected = false; // Reset the module selection flag
  }

  selectModule(moduleName: string) {
    if (moduleName && moduleName !== 'M1') {
      this.isModuleSelected = true; // Set to true when a module is selected
      this.showRightColumn = true; // Show the right column when selecting a module
    } else {
      // Handle the case when 'M1' is clicked
      this.isModuleSelected = false;
      this.showRightColumn = false;
    }
    this.selectedModule = moduleName;
  }
}
