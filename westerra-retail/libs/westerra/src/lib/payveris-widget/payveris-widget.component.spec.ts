import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayverisWidgetComponent } from './payveris-widget.component';

describe('PayverisWidgetComponent', () => {
  let component: PayverisWidgetComponent;
  let fixture: ComponentFixture<PayverisWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayverisWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayverisWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
