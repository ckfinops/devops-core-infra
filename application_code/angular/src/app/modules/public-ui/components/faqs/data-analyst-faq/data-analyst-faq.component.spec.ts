import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalystFaqComponent } from './data-analyst-faq.component';

describe('DataAnalystFaqComponent', () => {
  let component: DataAnalystFaqComponent;
  let fixture: ComponentFixture<DataAnalystFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAnalystFaqComponent]
    });
    fixture = TestBed.createComponent(DataAnalystFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
