export interface IUserRecord {
  statusBooking:
    | "cancelled"
    | "refund"
    | "consideration"
    | "isActive"
    | "touristCancelled";
  dateFrom: string;
  dateTo: string;
  publicTourId: string;
  bookingId: string;
  tourAmount: number;
  touristsAmount: number;
  contactInformation: {
    name: string;
    email: string;
    phone: string;
  };
  meetingPoint: string;
  meetingTime: string;
  cancelDeadline: string;
  tour: {
    tourId: string;
    tourName: string;
    additionalServices: string[];
    freeServices: string[];
    mapPoints: [number, number][];
  };
}
