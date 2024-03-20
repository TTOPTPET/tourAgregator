export interface ITourInfo {
  publicTourId?: string;
  creatorName?: string;
  tourName?: string;
  price?: number;
  region?: string;
  category?: string;
  photos?: string[];
  dateFrom?: string;
  dateTo?: string;
  meetingPoint?: string;
  meetingDatetime: string;
  maxPersonNumber: number;
  complexity?: string;
  mapPoints?: [number, number][];
  tourDescription?: string;
  freeServices?: string[];
  additionalServices?: string[];
  recommendedAgeFrom?: number;
  recommendedAgeTo?: number;
  vacancies: number;
}
