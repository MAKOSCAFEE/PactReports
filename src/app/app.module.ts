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
import { D2HttpClientModule } from 'd2-http-client';
import * as Material from './material';

@NgModule({
  declarations: [AppComponent, MainNavComponent, DataTableComponent],
  imports: [
    BrowserModule,
    D2HttpClientModule,
    HttpClientModule,
    NgxDatatableModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    ...Material.materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
