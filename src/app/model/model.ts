export interface Book {
  name: string;
  sheets: Sheet[];
  active: boolean;
}
export interface Sheet {
  active: boolean;
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
