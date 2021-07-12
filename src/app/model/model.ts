export interface Book {
  name: string;
  sheets: Sheet[];
}
export interface Sheet {
  name: string;
  columns: Column[];
  rows: string[][];
}
export interface Column {
  name: string;
  width: number;
  sort: SortDirection;
}

export enum SortDirection {
  OFF = 'Off',
  ASC = 'Asc',
  DESC = 'Desc'
}
