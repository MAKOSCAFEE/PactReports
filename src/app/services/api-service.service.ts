import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSqlView(sqlViewId: string): Observable<any> {
    const arrayToObject = (row, headers) =>
      Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: item })));

    return this.http.get<sqlViewApi>(`../../../api/sqlViews/${sqlViewId}/data.json`).pipe(
      map(({ rows, headers }) => ({
        headers: headers.map(header => header.column),
        data: rows.map(row => arrayToObject(row, headers))
      }))
    );
  }
}

export interface sqlViewApi {
  rows: any[];
  headers: Headers[];
}

export interface Headers {
  name: string;
  column: string;
}
