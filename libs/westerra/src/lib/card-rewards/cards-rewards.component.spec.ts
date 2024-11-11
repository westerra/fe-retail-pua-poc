import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRewardsComponent } from './cards-rewards.component';

describe('CardRewardsComponent', () => {
  let component: CardsRewardsComponent;
  let fixture: ComponentFixture<CardsRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsRewardsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
