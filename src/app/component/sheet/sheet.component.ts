import { Component, Input, OnInit } from '@angular/core';
import { Column, Sheet } from 'src/app/model/model';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
})
export class SheetComponent
  extends TrackableDataItemComponent
  implements OnInit
{
  @Input()
  sheet: Sheet;

  @Input()
  b: number;

  @Input()
  s: number;

  constructor(private dataService: DataService) {
    super();
  }

  ngOnInit(): void {}

  addRowAt(book: number, sheet: number, row: number): void {
    this.dataService.addRowAt(book, sheet, row);
  }
  removeColumn(sheet: Sheet, column: Column): void {
    this.dataService.removeColumn(sheet, column);
  }
  addColumn(book: number, sheet: number, column: number): void {
    this.dataService.addColumn(book, sheet, column);
  }
  toggleSort(book: number, sheet: number, column: number): void {
    this.dataService.toggleSort(book, sheet, column);
  }
  getGridTemplateColumns(sheet: Sheet): string {
    return this.sheet.columns.map((r) => '1fr').join(' ') + ' 44px';
  }
}
