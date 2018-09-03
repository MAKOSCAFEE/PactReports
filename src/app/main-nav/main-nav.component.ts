import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-main-nav',
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

  setExport(sqlViewId, showDate = false) {
    this.sqlViewId = sqlViewId;
    this.openDialog(sqlViewId, showDate);
  }

  openDialog(sqlViewId: string, showDate: boolean): void {
    const dialogRef = this.dialog.open(FilterContainerComponent, {
      width: '50%',
      data: { sqlViewId, showDate }
    });

    dialogRef.afterClosed().subscribe((result: Result) => {
      this.data = result;
    });
  }
}

export interface Result {
  pe: string;
  ou: string;
  ouname: string;
  sqlViewId: string;
}
