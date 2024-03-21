export interface IBookingInfo {
  phone: string;
  email: string;
  name: string;
  bookingId: string;
  tourAmount: number;
  tourists: {
    name: string;
    birthDate: string;
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
  bookingId?: number;
  maxPersonNumber?: number;
  personNum?: number;
  bookingNumber?: number;
  cancelDeadline?: string;
  dateFrom?: string;
  dateTo?: string;
  bookingInfo?: IBookingInfo[];
  tourName?: string;
}
