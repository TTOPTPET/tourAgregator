export interface IAddTour {
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  photos?: (string | File)[];
  recommendedAgeFrom?: number;
  recommendedAgeTo?: number;
  mapPoints?: [number, number][];
  freeServices?: string[];
  additionalServices?: string[];
}
