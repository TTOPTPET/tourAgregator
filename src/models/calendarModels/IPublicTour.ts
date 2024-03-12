export interface IBookingInfo {
  userInfo: {
    phone: string;
    email: string;
    name: string;
  };
  bookingId: string;
  tourAmount: number;
  bookingDate: {
    from: string;
    to: string;
  };
  touristsInfo: {
    name: string;
    age: string;
    sex: string;
  }[];
  comment: string;
}

export interface IPublicTour {
  tourId?: string;
  publicTourId?: string;
  publicTourProfit?: number;
  meetingPoint?: string;
  meetingTime?: string;
  tourAmount?: number;
  tourAmountWithCommission?: number;
  bookingId?: number;
  contactInformation?: string;
  maxPersonNumber?: number;
  personNum?: number;
  bookingNumber?: number;
  cancelDeadline?: string;
  updateDeadline?: string;
  date?: {
    dateFrom: string;
    dateTo: string;
  };
  bookingInfo?: IBookingInfo[];
  tour?: {
    tourName: string;
  };
}
