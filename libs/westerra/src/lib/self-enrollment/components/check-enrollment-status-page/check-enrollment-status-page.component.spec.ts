import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEnrollmentStatusPageComponent } from './check-enrollment-status-page.component';

describe('CheckEnrollmentStatusPageComponent', () => {
  let component: CheckEnrollmentStatusPageComponent;
  let fixture: ComponentFixture<CheckEnrollmentStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckEnrollmentStatusPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEnrollmentStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
