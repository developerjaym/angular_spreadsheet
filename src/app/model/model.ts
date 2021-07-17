export interface Book {
  name: string;
  sheets: Sheet[];
}
export interface Sheet {
  name: string;
  columns: Column[];
  rows: Row[];
}
export interface Column {
  name: string;
  width: number;
  sort: SortDirection;
}
export interface Row {
  data: string[],
  options: {[key: string]: string};
}
export enum SortDirection {
  OFF = 'Off',
  ASC = 'Asc',
  DESC = 'Desc'
}
