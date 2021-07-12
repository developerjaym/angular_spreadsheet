import { Injectable } from '@angular/core';
import { Column, Sheet, SortDirection } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  books = [
    {
      name: 'Book 1',
      sheets: [
        {
          rows: [
            ['hi', 'hey', 'hello'],
            ['konnichiwa', 'ohayoo gozaimasu', 'konbanwa'],
            ['konnichiwa', 'ohayoo gozaimasu', 'konbanwa'],
          ],
          name: 'Sheet 1',
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
            {
              name: 'C',
              width: 1,
              sort: SortDirection.OFF,
            },
          ],
        },
      ],
    },
  ];

  constructor() {}

  get() {
    const dataString = localStorage.getItem("test-spreadsheet") || JSON.stringify(this.books);
    this.books = JSON.parse(dataString);
    this.books.forEach((book) =>
      book.sheets.forEach((sheet) => this.sortSheet(sheet))
    );
    return this.books;
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
    sheetToAddTo.rows.splice(row, 0, newRow);
  }
  removeColumn(sheet: Sheet, column: Column): void {
    if (sheet.columns.length === 1) {
      return; // don't delete everything
    }
    const index = sheet.columns.findIndex((col) => col === column);
    sheet.columns.splice(index, 1);
    sheet.rows.forEach((row) => row.splice(index, 1));
  }
  addColumn(book: number, sheet: number, column: number): void {
    const sheetToAddTo = this.books[book].sheets[sheet];
    sheetToAddTo.columns.splice(column, 0, {
      name: 'N',
      width: 1,
      sort: SortDirection.OFF,
    });
    sheetToAddTo.rows.forEach((row) => {
      row.splice(column, 0, '');
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
          return row1[i] > row2[i] ? 1 : row1[i] === row2[i] ? 0 : -1;
        }
        return row1[i] > row2[i] ? -1 : row1[i] === row2[i] ? 0 : 1;
      }
      return 0;
    });
  }
}
