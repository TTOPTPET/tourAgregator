export enum UserType {
  tourist = 1,
  creator = 2,
}

// export interface CreatorDocuments {
//   documentName: string;
//   documentPath?: string;
//   file?: File;
//   tempId?: string;
// }
interface IUserInfo {
  name?: string;
  phone?: string;
  email?: string;
  id?: string;
  is_active?: boolean; //Бан статус
  is_superuser?: boolean;
  is_verified?: boolean;
  inn?: string;
}
export interface ICreatorInfo extends IUserInfo {
  role_id?: UserType.creator;
}

export interface ITouristInfo extends IUserInfo {
  role_id?: UserType.tourist;
}
