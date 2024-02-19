export interface IUserRecord {
  publicTourId?: string;
  bookingId?: number;
  statusUpdate?: boolean;
  bookingStatus?: {
    payment: string;
    cancellation: "cancelledCreator" | "cancelledAdmin" | "cancelledTourists";
    past: boolean;
    needPayment: boolean;
  };
  tourDate?: {
    from: string;
    to: string;
  };
  tourAmount?: number;
  contactInformation?: string;
  meetingPoint?: string;
  meetingTime?: string;
  bookingNumber?: number;
  tour?: {
    mapPoints?: [number, number][];
    tourId: string;
    tourName: string;
    housingInclude?: {
      housingName: string;
      housingAddress: string;
      housingDescription?: string;
    };
    insuranceInclude?: {
      insuranceNumber: number;
      insuranceAmount: number;
    };
    freeServices?: string[];
  };
}
