import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsernamePageComponent } from './create-username-page.component';

describe('CreateUsernamePageComponent', () => {
  let component: CreateUsernamePageComponent;
  let fixture: ComponentFixture<CreateUsernamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUsernamePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsernamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
