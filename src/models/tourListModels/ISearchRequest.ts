export interface ISearchRequest {
  searchParam?: string;
  category?: string[];
  complexity?: string[];
  prices?: {
    min: number;
    max: number;
  };
  age?: {
    min: number;
    max: number;
  };
  region?: string;
  tourdate?: {
    dateFrom?: string;
    dateTo?: string;
  };
  maxPersonNumber?: number;
}
