import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.css']
})
export class CustomDatepickerComponent implements OnInit {
  customDatePicker = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(new Date())
  });

  @Output()
  periodUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.onFormChanges();
  }

  onFormChanges() {
    this.customDatePicker.valueChanges.subscribe(form => {
      const startDate = moment(form.startDate).format('YYYY-MM-DD');
      const endDate = moment(form.endDate).format('YYYY-MM-DD');
      this.periodUpdate.emit({ period: { startDate, endDate } });
    });
  }
}
