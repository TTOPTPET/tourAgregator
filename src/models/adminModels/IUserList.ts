export interface IUserList {
  role_id?: number;
  is_active?: boolean;
  email?: string;
  name?: string;
  id?: number;
  phone?: string;
}

export interface IUserListResponse {
  details: {
    page: number;
    perPage: number;
    hasMore: boolean;
  };
  data: IUserList[];
}
