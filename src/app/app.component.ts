import { Component, OnInit } from '@angular/core';
import { Book, Column, Sheet } from './model/model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'spreadsheet';
  books: Book[] = [];
  showingOptionsFor = {
    book: -1,
    sheet: -1,
    row: -1,
  };

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    // go through each column
    // sort?
    this.books = this.dataService.get();

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
  getGridTemplateColumns(sheet: Sheet): string {
    let arr = [];
    arr[sheet.columns.length - 1] = '1fr';
    arr.fill('1fr'); // a grid column for each column;
    arr.push('44px'); // a column for options
    return arr.join(' ');
  }
  addRowAt(book: number, sheet: number, row: number): void {
    this.resetShowOptions();
    this.dataService.addRowAt(book, sheet, row);
  }
  removeRowAt(book: number, sheet: number, row: number): void {
    this.resetShowOptions();
    this.dataService.removeRowAt(book, sheet, row);
  }
  removeColumn(sheet: Sheet, column: Column): void {
   this.dataService.removeColumn(sheet, column);
  }
  addColumn(book: number, sheet: number, column: number): void {
    this.dataService.addColumn(book, sheet, column);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  toggleSort(book: number, sheet: number, column: number): void {
    this.resetShowOptions();
    this.dataService.toggleSort(book, sheet, column);
  }
  save(): void {
    this.dataService.save();
  }
}

