export interface SearchDto {
  shops?: string[];
  query: string;
  page?: number;
}

export enum SearchState {
  Initial,
  Found,
  NotFound,
}
