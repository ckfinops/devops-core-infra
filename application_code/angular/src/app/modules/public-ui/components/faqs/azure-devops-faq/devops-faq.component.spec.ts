import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevopsFaqComponent } from './devops-faq.component';

describe('DevopsFaqComponent', () => {
  let component: DevopsFaqComponent;
  let fixture: ComponentFixture<DevopsFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevopsFaqComponent]
    });
    fixture = TestBed.createComponent(DevopsFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
