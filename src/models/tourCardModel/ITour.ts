export interface ITour {
  tourId?: string;
  tourName: string;
  category?: string;
  complexity?: string;
  price?: number;
  region?: string;
  dateFrom?: string;
  dateTo?: string;
  personsNumber?: number;
  photos?: string[];
  banStatus?: boolean;
  publicNum?: number;
  cancelDeadline?: string;
  publicTourId?: string;
}

export interface ITourResponse {
  tourId?: string;
  tourName?: string;
  photos?: string[];
  category?: string;
  price?: number;
  region?: string;
  dateFrom?: string;
  dateTo?: string;
  publicCount?: number;
  complexity?: string;
}
