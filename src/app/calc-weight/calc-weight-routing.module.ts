import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './calc/calc.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: CalcComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes), ChartsModule],
  exports: [RouterModule]
})
export class CalcWeightRoutingModule { }
