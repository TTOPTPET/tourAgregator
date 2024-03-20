export interface IBookingTourist {
  name?: string;
  birthDate?: string;
}

export interface ITourBookingData {
  tourAmount?: number;
  publicTourId?: string;
  tourists?: IBookingTourist[];
  comment?: string;
  touristsAmount?: number;
}
