import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentHandlerComponent } from './enrollment-handler.component';

describe('EnrollmentHandlerComponent', () => {
  let component: EnrollmentHandlerComponent;
  let fixture: ComponentFixture<EnrollmentHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentHandlerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
