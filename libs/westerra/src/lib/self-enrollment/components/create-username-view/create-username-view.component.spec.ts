import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsernameViewComponent } from './create-username-view.component';

describe('CreateUsernameViewComponent', () => {
  let component: CreateUsernameViewComponent;
  let fixture: ComponentFixture<CreateUsernameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUsernameViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsernameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
