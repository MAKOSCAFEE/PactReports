import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgUnitFilterComponent } from './org-unit-filter.component';
import { TreeModule } from 'angular-tree-component';
import { TranslateModule } from '@ngx-translate/core';
import { OrgUnitService } from './org-unit.service';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterLevelPipe } from './pipes/filter-level.pipe';
import * as Material from '../../material';

@NgModule({
  imports: [CommonModule, TreeModule, TranslateModule, ...Material.materialModules],
  declarations: [OrgUnitFilterComponent, MultiselectComponent, ClickOutsideDirective, FilterLevelPipe],
  exports: [OrgUnitFilterComponent],
  providers: [OrgUnitService]
})
export class OrgUnitFilterModule {}
