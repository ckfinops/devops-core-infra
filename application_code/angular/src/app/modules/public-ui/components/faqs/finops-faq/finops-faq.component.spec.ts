import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinopsFaqComponent } from './finops-faq.component';

describe('FinopsFaqComponent', () => {
  let component: FinopsFaqComponent;
  let fixture: ComponentFixture<FinopsFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinopsFaqComponent]
    });
    fixture = TestBed.createComponent(FinopsFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
