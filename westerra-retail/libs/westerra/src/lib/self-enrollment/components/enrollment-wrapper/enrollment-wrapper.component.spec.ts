import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentWrapperComponent } from './enrollment-wrapper.component';

describe('EnrollmentWrapperComponent', () => {
  let component: EnrollmentWrapperComponent;
  let fixture: ComponentFixture<EnrollmentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
