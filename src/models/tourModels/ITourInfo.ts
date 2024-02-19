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
  price?: number;
  prices?: {
    from: number;
    to: number;
  };
  recommendedAge?: {
    from?: number;
    to?: number;
  };
  mapPoints?: [number, number][];
  housingInclude?: {
    housingName: string;
    housingAddress: string;
    housingDescription?: string;
  };
  insuranceInclude?: {
    insuranceNumber: number;
    insuranceAmount: number;
  };
  recommendations?: string[];
  tourServices?: {
    freeServices?: string[];
    additionalServices?: string[];
  };
  creatorInfo?: {
    name: string;
    creatorType: string;
    photo: string;
  };
}
