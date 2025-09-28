import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinopsEligibilityComponent } from './finops-eligibility.component';

describe('FinopsEligibilityComponent', () => {
  let component: FinopsEligibilityComponent;
  let fixture: ComponentFixture<FinopsEligibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinopsEligibilityComponent]
    });
    fixture = TestBed.createComponent(FinopsEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
