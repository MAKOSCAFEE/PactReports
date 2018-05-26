import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSqlView(sqlViewId: string, orgUnitId: string): Observable<any> {
    const arrayToObject = (row, headers) =>
      Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: item })));

    return this.http.get<sqlViewApi>(`../../../api/sqlViews/${sqlViewId}/data.json?var=orgUnitId:${orgUnitId}`).pipe(
      map(({ rows, headers }) => ({
        headers: headers.map(header => header.column),
        data: rows.map(row => arrayToObject(row, headers))
      }))
    );
  }

  getTei(ouUnits: string, programId: string): Observable<any> {
    let url = `../../../api/trackedEntityInstances.json?ou=${ouUnits}&program=${programId}&ouMode=DESCENDANTS&skipPaging=true&fields=attributes[*]`;
    const { showRelatives, neededAttributes } = programs[programId];
    if (showRelatives) {
      url = `${url},relationships[relative[attributes[*]]]`;
    }

    const attributesObject = attributes =>
      Object.assign({}, ...attributes.map(item => ({ [item.attribute]: item.value })));
    const arrayToObject = (tei: TeiField) =>
      Object.assign(
        {},
        ...attributesObject(tei.attributes),
        showRelatives
          ? tei.relationships[0]
            ? { caregiverId: attributesObject(tei.relationships[0].relative.attributes)['bKTmwB6PDTt'] }
            : {}
          : {}
      );
    return this.http.get<TrackedEntityInstancesResponse>(url).pipe(
      map(({ trackedEntityInstances }) => ({
        data: trackedEntityInstances.map(tei => arrayToObject(tei)),
        headers: neededAttributes
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

export interface TrackedEntityInstancesResponse {
  trackedEntityInstances: TeiField[];
}
export interface TeiField {
  attributes: Attribute[];
  relationships: Relationship[];
}
export interface Relationship {
  relative: { attributes: Attribute[] };
}

export interface Attribute {
  code: string;
  attribute: string;
  displayName: string;
  value: string;
}

export const programs = {
  iGSJhZVILmu: {
    showRelatives: false,
    neededAttributes: [
      {
        id: 'bKTmwB6PDTt',
        displayName: 'Beneficiary ID'
      },
      {
        id: 'wKZOf7Xd6RJ',
        displayName: 'First Name'
      },
      {
        id: 'TuJaIayy3A2',
        displayName: 'Middle Name'
      },
      {
        id: 'Xtoh0miFXff',
        displayName: 'Surname'
      },
      {
        id: 'la9teParwqJ',
        displayName: 'Year of Birth'
      },
      {
        id: 'BoWCrQ9KA0K',
        displayName: 'Sex'
      },
      {
        id: 'Z4VnoV1KpjQ',
        displayName: 'Program Status'
      }
    ]
  },
  aSc8KoK2Q81: {
    showRelatives: true,
    neededAttributes: [
      {
        id: 'bKTmwB6PDTt',
        displayName: 'Beneficiary ID'
      },
      {
        id: 'wKZOf7Xd6RJ',
        displayName: 'First Name'
      },
      {
        id: 'TuJaIayy3A2',
        displayName: 'Middle Name'
      },
      {
        id: 'Xtoh0miFXff',
        displayName: 'Surname'
      },
      {
        id: 'OvCYjoQR9EO',
        displayName: 'Date Of Birth'
      },
      {
        id: 'BoWCrQ9KA0K',
        displayName: 'Sex'
      },
      {
        id: 'Z4VnoV1KpjQ',
        displayName: 'Program Status'
      },
      {
        id: 'LzQxOyZ2zB7',
        displayName: 'HIV status'
      },
      {
        id: 'caregiverId',
        displayName: 'Caregiver ID'
      }
    ]
  }
};
