import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentProgressIndicatorComponent } from './enrollment-progress-indicator.component';

describe('EnrollmentProgressIndicatorComponent', () => {
  let component: EnrollmentProgressIndicatorComponent;
  let fixture: ComponentFixture<EnrollmentProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentProgressIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
