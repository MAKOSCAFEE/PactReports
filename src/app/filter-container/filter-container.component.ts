import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent {
  periodConfig: any;
  orgUnitModel: any;
  selectedPeriodType: string;
  selectedPeriodObject: PeriodObject;

  orgUnitTreeConfig: any = {
    show_search: true,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select Organisation Unit'
  };
  constructor(public dialogRef: MatDialogRef<FilterContainerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.periodConfig = {
      resetOnPeriodTypeChange: true,
      emitOnSelection: true,
      singleSelection: false
    };
    this.orgUnitModel = {
      selectionMode: 'orgUnit',
      selectedLevels: [],
      showUpdateButton: false,
      selectedGroups: [],
      orgUnitLevels: [],
      orgUnitGroups: [],
      selectedOrgUnits: [],
      userOrgUnits: [],
      type: 'report', // can be 'data_entry'
      selectedUserOrgUnits: []
    };
    this.selectedPeriodType = 'Yearly';
  }

  onPeriodUpdate(event: PeriodObject): void {
    const { value } = event;
    this.data = { ...this.data, pe: value };
  }

  onOrgUnitUpdate(event): void {
    const { value } = event;
    this.data = { ...this.data, ou: value };
    this.dialogRef.close(this.data);
  }

  onOrgUnitClose(event): void {
    this.dialogRef.close();
  }
}

export interface PeriodObject {
  items: any[];
  name: string;
  value: string;
}
