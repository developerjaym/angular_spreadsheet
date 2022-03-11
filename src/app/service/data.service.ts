import { Injectable } from '@angular/core';
import { Book, Column, Sheet, SortDirection } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  books = [
    {
      active: true,
      name: 'My First Book',
      sheets: [
        {
          active: true,
          rows: [{
            data: ['Welcome', ''],
            options: {}
          },
          ],
          name: 'My First Sheet',
          columns: [
            {
              name: 'A',
              width: 1,
              sort: SortDirection.OFF,
            },
            {
              name: 'B',
              width: 1,
              sort: SortDirection.OFF,
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    this.books = this.get();
    window.setInterval(() => this.save(), 30_000);
  }

  get() {
    const dataString = localStorage.getItem("test-spreadsheet") || JSON.stringify(this.books);
    this.books = JSON.parse(dataString);
    this.books.forEach((book) =>
      book.sheets.forEach((sheet) => this.sortSheet(sheet))
    );
    return this.books;
  }
  getBook(book: number): Book {
    return this.books[book];
  }
  save() {
    localStorage.setItem("test-spreadsheet", JSON.stringify(this.books));
  }
  removeRowAt(book: number, sheet: number, row: number): void {
    this.books[book].sheets[sheet].rows.splice(row, 1);
  }
  addRowAt(book: number, sheet: number, row: number): void {
    const sheetToAddTo = this.books[book].sheets[sheet];
    const newRow = [];
    newRow[sheetToAddTo.columns.length - 1] = '';
    newRow.fill('');
    sheetToAddTo.rows.splice(row, 0, {data: newRow,  options: {}});
  }
  removeSheetAt(book: number, sheet: number): void {
    const activeSheetBeingDeleted = this.books[book].sheets[sheet].active;
    this.books[book].sheets.splice(sheet, 1);
    if(activeSheetBeingDeleted) {
      this.setActiveSheet(book, 0);
    }
  }
  addSheetAt(book: number, sheet: number): void {
    const bookToAddTo = this.books[book];
    const newSheet: Sheet = {active: false, name: 'New Sheet', columns: [{name: 'A', width: 1, sort: SortDirection.OFF}], rows: [{data: [''], options: {}}]};
    bookToAddTo.sheets.splice(sheet, 0, newSheet);
  }
  setActiveSheet(book: number, sheet: number): void {
    this.books[book].sheets.forEach(s => s.active = false);
    this.books[book].sheets[sheet].active = true;
  }
  setActiveBook(book: number): void {
    this.books.forEach(b => {
      b.active = false;
      b.sheets.forEach(s => s.active = false);
    });
    this.books[book].active = true;
    this.books[book].sheets[0].active = true;
  }
  removeBookAt(book: number): void {
    const activeBookBeingDeleted = this.books[book].active;
    this.books.splice(book, 1);
    if(activeBookBeingDeleted) {
      this.setActiveBook(0);
      this.setActiveSheet(0, 0);
    }
  }
  addBookAt(book: number): void {
    const newSheet: Sheet = {active: false, name: 'New Sheet', columns: [{name: 'A', width: 1, sort: SortDirection.OFF}], rows: [{data: [''], options: {}}]};
    const newBook: Book = {active: false, name: 'New Book', sheets: [newSheet]};
    this.books.splice(book, 0, newBook);
  }
  importBook(book: Book): void {
    this.books.push(book);
    this.save();
  }
  removeColumn(sheet: Sheet, column: Column): void {
    if (sheet.columns.length === 1) {
      return; // don't delete everything
    }
    const index = sheet.columns.findIndex((col) => col === column);
    sheet.columns.splice(index, 1);
    sheet.rows.forEach((row) => row.data.splice(index, 1));
  }
  addColumn(book: number, sheet: number, column: number): void {
    const sheetToAddTo = this.books[book].sheets[sheet];
    sheetToAddTo.columns.splice(column, 0, {
      name: 'N',
      width: 1,
      sort: SortDirection.OFF,
    });
    sheetToAddTo.rows.forEach((row) => {
      row.data.splice(column, 0, '');
    });
  }

  toggleSort(book: number, sheet: number, column: number): void {
    const sheetToSort = this.books[book].sheets[sheet];
    sheetToSort.columns
      .filter((col, i) => i !== column)
      .forEach((col) => (col.sort = SortDirection.OFF)); // turn off other columns for now

    const sortMe = this.books[book].sheets[sheet].columns[column];
    if (sortMe.sort === SortDirection.OFF) {
      sortMe.sort = SortDirection.ASC;
    } else if (sortMe.sort === SortDirection.ASC) {
      sortMe.sort = SortDirection.DESC;
    } else {
      sortMe.sort = SortDirection.OFF;
    }
    this.sortSheet(this.books[book].sheets[sheet]);
  }
  private sortSheet(sheet: Sheet): void {
    sheet.rows.sort((row1, row2) => {
      for (let i = 0; i < sheet.columns.length; i++) {
        const column = sheet.columns[i];
        if (column.sort === SortDirection.OFF) {
          continue;
        } else if (column.sort === SortDirection.ASC) {
          return row1.data[i] > row2.data[i] ? 1 : row1.data[i] === row2.data[i] ? 0 : -1;
        }
        return row1.data[i] > row2.data[i] ? -1 : row1.data[i] === row2.data[i] ? 0 : 1;
      }
      return 0;
    });
  }

}
