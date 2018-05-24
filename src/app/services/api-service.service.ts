import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from 'd2-http-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClientService) {}

  getSqlView(sqlViewId: string): Observable<any> {
    const arrayToObject = (row, headers) =>
      Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: item })));

    return this.http.get(`sqlViews/${sqlViewId}/data.json`).pipe(
      map(({ rows, headers }) => ({
        headers: headers.map(header => header.column),
        data: rows.map(row => arrayToObject(row, headers))
      }))
    );
  }
}
