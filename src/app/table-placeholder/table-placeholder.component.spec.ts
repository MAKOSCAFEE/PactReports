import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlaceholderComponent } from './table-placeholder.component';

describe('TablePlaceholderComponent', () => {
  let component: TablePlaceholderComponent;
  let fixture: ComponentFixture<TablePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
