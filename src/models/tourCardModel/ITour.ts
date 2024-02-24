export interface ITour {
  tourId?: string;
  tourName: string;
  category: string;
  complexity: string;
  prices?: {
    from: number;
    to?: number;
  };
  price?: number;
  region: string;
  tourDate: {
    from: string;
    to: string;
  };
  personsNumber: number;
  photos: string[];
  banStatus: boolean;
  publicSimilarDatesAmount?: number;
  publicNum?: number;
  cancelDeadline: string;
  publicTourId: string;
}
