export enum SortDirection {
  none,
  desc,
  asc,
}

export interface SortBy {
  date: SortDirection;
  viewers: SortDirection;
  keyword: string;
}
