import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAEligibilityComponent } from './da-eligibility.component';

describe('DAEligibilityComponent', () => {
  let component: DAEligibilityComponent;
  let fixture: ComponentFixture<DAEligibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DAEligibilityComponent]
    });
    fixture = TestBed.createComponent(DAEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
