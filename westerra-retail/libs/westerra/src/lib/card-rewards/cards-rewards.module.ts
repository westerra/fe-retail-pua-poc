import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsRewardsComponent } from './cards-rewards.component';
import { WesterraAmplifiDataModule } from '../services/westerra-amplifi-data/westerra-amplifi-data.module';


@NgModule({
  declarations: [CardsRewardsComponent],
  imports: [
    CommonModule,
    WesterraAmplifiDataModule
  ]
})
export class CardsRewardsModule { }
