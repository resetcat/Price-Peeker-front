export interface SearchDto {
  shops?: number[];
  query: string;
  page?: number;
}

export enum SearchState {
  Initial,
  Found,
  NotFound,
}
