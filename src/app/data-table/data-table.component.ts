import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
export class DataTableComponent implements OnChanges {
  @Input()
  sqlViewId: string;
  @Input()
  data: any;
  resultsLength = 0;
  isLoadingResults = false;
  isLoaded = false;
  timeout: any;
  rows;
  headers;
  ouname;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;

    if (data && data.currentValue) {
      const { ou, sqlViewId, ouname, pe } = data.currentValue;
      this.ouname = ouname;
      const { startDate, endDate } = pe || { startDate: null, endDate: null };
      this.getData(ou, sqlViewId, startDate, endDate);
    }
  }

  getData(ou: string, sqlViewId: string, startDate: string = null, endDate: string = null) {
    this.isLoadingResults = true;
    this.isLoaded = false;
    this.apiService.getSqlView(sqlViewId, ou, startDate, endDate).subscribe(({ headers, data }) => {
      this.isLoadingResults = false;
      this.isLoaded = true;
      this.headers = headers;
      this.rows = data;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, `${fileName}_${this.ouname}_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  exportDataToExcel() {
    this.exportAsExcelFile(this.rows, 'Beneficiaries');
  }
}
