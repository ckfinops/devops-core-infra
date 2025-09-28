import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevopsEligibilityComponent } from './aws-eligibility.component';

describe('DevopsEligibilityComponent', () => {
  let component: DevopsEligibilityComponent;
  let fixture: ComponentFixture<DevopsEligibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevopsEligibilityComponent]
    });
    fixture = TestBed.createComponent(DevopsEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
