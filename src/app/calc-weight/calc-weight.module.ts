import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalcWeightRoutingModule } from './calc-weight-routing.module';
import { CalcComponent } from './calc/calc.component';

@NgModule({
  declarations: [CalcComponent],
  imports: [
    CommonModule,
    CalcWeightRoutingModule
  ]
})
export class CalcWeightModule { }
