import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api-service.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['created', 'state', 'number', 'title'];
  exampleDatabase: any;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isLoaded = false;
  timeout: any;
  rows;
  headers;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const caregiverSqlViewId = 'z7PrGzK1Wj7';
    this.getData(caregiverSqlViewId);
  }

  getData(sqlViewId: string) {
    this.isLoadingResults = true;
    this.isLoaded = false;
    this.apiService.getSqlView(sqlViewId).subscribe(({ headers, data }) => {
      this.isLoadingResults = false;
      this.isLoaded = true;
      this.headers = headers;
      this.rows = data;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportDataToExcel() {
    this.exportAsExcelFile(this.rows, 'Beneficiaries');
  }
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
