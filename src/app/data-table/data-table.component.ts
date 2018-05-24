import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api-service.service';

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
  isRateLimitReached = false;
  timeout: any;
  rows;
  headers;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.isLoadingResults = true;
    this.apiService.getSqlView('z7PrGzK1Wj7').subscribe(({ headers, data }) => {
      this.isLoadingResults = false;
      this.headers = headers;
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  getRowHeight(row) {
    return Math.floor(Math.random() * 80) + 50;
  }
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
