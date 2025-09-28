import { Component } from '@angular/core';

@Component({
  selector: 'course-table-intense',
  templateUrl: './course-table-intense.component.html',
  styleUrls: ['./course-table-intense.component.css']
})
export class CourseIntenseTableComponent {
    selectedTab: string = 'os'; // Default selected tab
    selectedModule: string = 'M1'; // Default selected module
  
    selectTab(tabName: string) {
      this.selectedTab = tabName;
      this.selectedModule = 'M1'; // Reset selected module when tab changes
    }
  
    selectModule(moduleName: string) {
      this.selectedModule = moduleName;
    }
  }
