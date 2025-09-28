import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaCertifcatesComponent } from './da-certifcates.component';

describe('DaCertifcatesComponent', () => {
  let component: DaCertifcatesComponent;
  let fixture: ComponentFixture<DaCertifcatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaCertifcatesComponent]
    });
    fixture = TestBed.createComponent(DaCertifcatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
