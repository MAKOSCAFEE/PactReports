import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodFilterComponent } from './period-filter.component';
import { FormsModule } from '@angular/forms';
import { PeriodService } from './period.service';
import { TreeModule } from 'angular-tree-component';
import * as Material from '../../material';

@NgModule({
  imports: [CommonModule, FormsModule, TreeModule, ...Material.materialModules],
  declarations: [PeriodFilterComponent],
  exports: [PeriodFilterComponent],
  providers: [PeriodService]
})
export class PeriodFilterModule {}
