export interface ISearchResponse {
  status?: string;
  data: [
    {
      tourId?: string;
      tourName?: string;
      photos?: string[];
      category?: string;
      price?: number;
      region?: string;
      dateFrom?: string;
      dateTo?: string;
    },
  ];
  details?: {
    page?: number;
    perPage?: number;
    hasMore?: boolean;
  };
}
