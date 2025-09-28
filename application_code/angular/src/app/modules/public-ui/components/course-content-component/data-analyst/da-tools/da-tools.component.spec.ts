import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaToolsComponent } from './da-tools.component';

describe('DaToolsComponent', () => {
  let component: DaToolsComponent;
  let fixture: ComponentFixture<DaToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaToolsComponent]
    });
    fixture = TestBed.createComponent(DaToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
