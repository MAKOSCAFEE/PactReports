import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from 'd2-http-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private httpclient: HttpClientService) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<any> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<any>(requestUrl);
  }

  getSqlView(sqlViewId: string): Observable<any> {
    const arrayToObject = (row, headers) =>
      Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: item })));

    return this.httpclient.get(`sqlViews/${sqlViewId}/data.json`).pipe(
      map(({ rows, headers }) => ({
        headers: headers.map(header => header.column),
        data: rows.map(row => arrayToObject(row, headers))
      }))
    );
  }
}
