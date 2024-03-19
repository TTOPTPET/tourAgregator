export interface IUserMessage {
  description?: string;
  publicTourId?: string;
  gidEmail?: string;
  touristEmail?: string;
  claimId: number;
  creationDateTime?: string;
  tourName: string;
}

export interface IUserMessageResponse {
  details: {
    page: number;
    perPage: number;
    hasMore: boolean;
  };
  data: IUserMessage[];
}
