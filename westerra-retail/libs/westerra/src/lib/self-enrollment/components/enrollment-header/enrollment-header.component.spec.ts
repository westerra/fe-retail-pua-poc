import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentHeaderComponent } from './enrollment-header.component';

describe('EnrollmentHeaderComponent', () => {
  let component: EnrollmentHeaderComponent;
  let fixture: ComponentFixture<EnrollmentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
