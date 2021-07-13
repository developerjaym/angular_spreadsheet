import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent extends TrackableDataItemComponent implements OnInit {

  @Input()
  row: String[];

  @Input()
  b: number;
  @Input()
  s: number;
  @Input()
  r: number;

  showingOptionsFor = {
    book: -1,
    sheet: -1,
    row: -1,
  };

  constructor(private dataService: DataService) {
    super();
   }

  ngOnInit(): void {
  }

  shouldShowOptions(book: number, sheet: number, row: number): boolean {
    return (
      this.showingOptionsFor.book === book &&
      this.showingOptionsFor.sheet === sheet &&
      this.showingOptionsFor.row === row
    );
  }
  showOptions(book: number, sheet: number, row: number): void {
    if (this.shouldShowOptions(book, sheet, row)) {
      //reset
      this.resetShowOptions();
      return;
    }
    this.showingOptionsFor.book = book;
    this.showingOptionsFor.sheet = sheet;
    this.showingOptionsFor.row = row;
  }
  resetShowOptions(): void {
    this.showingOptionsFor = {
      book: -1,
      sheet: -1,
      row: -1,
    };
  }

  addRowAt(book: number, sheet: number, row: number): void {
    this.resetShowOptions();
    this.dataService.addRowAt(book, sheet, row);
  }
  removeRowAt(book: number, sheet: number, row: number): void {
    this.resetShowOptions();
    this.dataService.removeRowAt(book, sheet, row);
  }

  getGridTemplateColumns(): string {
    return this.row.map(r => '1fr').join(' ') + ' 44px'
  }
}
