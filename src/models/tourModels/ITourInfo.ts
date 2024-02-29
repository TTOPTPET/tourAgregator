export interface ITourInfo {
  photos?: string[];
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  id?: string;
  creatorId?: string;
  nearestDate?: {
    from: string;
    to: string;
  };
  // price?: number;
  // prices?: {
  //   from: number;
  //   to: number;
  // };
  recommendedAgeFrom?: number;
  recommendedAgeTo?: number;
  mapPoints?: [number, number][];
  freeServices?: string[];
  additionalServices?: string[];
  creatorName?: string;
}
