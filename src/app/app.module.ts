import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LayoutModule } from '@angular/cdk/layout';
import * as Material from './material';
import { TablePlaceholderComponent } from './table-placeholder/table-placeholder.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import * as Shared from './shared';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DataTableComponent,
    TablePlaceholderComponent,
    FilterContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    ...Material.materialModules,
    ...Shared.modules
  ],
  providers: [],
  entryComponents: [MainNavComponent, FilterContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
