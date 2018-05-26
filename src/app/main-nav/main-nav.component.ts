import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  public sqlViewId: string;
  public data: Result;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.sqlViewId = null;
  }

  setExport(sqlViewId) {
    this.sqlViewId = sqlViewId;
    this.openDialog(sqlViewId);
  }

  openDialog(sqlViewId): void {
    let dialogRef = this.dialog.open(FilterContainerComponent, {
      width: '50%',
      data: { sqlViewId }
    });

    dialogRef.afterClosed().subscribe((result: Result) => {
      console.log('The dialog was closed');
      this.data = result;
    });
  }
}

export interface Result {
  pe: string;
  ou: string;
  sqlViewId: string;
}
