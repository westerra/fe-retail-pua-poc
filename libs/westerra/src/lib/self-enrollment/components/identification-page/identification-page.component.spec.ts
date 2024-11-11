import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationPageComponent } from './identification-page.component';

describe('IdentificationPageComponent', () => {
  let component: IdentificationPageComponent;
  let fixture: ComponentFixture<IdentificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentificationPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
