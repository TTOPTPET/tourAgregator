export enum StatusVerify {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
  waitVerified = "waitVerified",
}

export enum Sex {
  male = "мужской",
  female = "женский",
}

export enum UserType {
  tourist = 1,
  creator = 2,
}

export interface CreatorDocuments {
  documentName: string;
  documentPath?: string;
  file?: File;
  tempId?: string;
}

interface ICreatorFields {
  inn?: string;
  adress?: string;
  pasport?: string;
}

export interface ICreatorData {
  changeStatus?: boolean;
  timeToSend?: string;
  documents?: CreatorDocuments[];
  dataVerify?: string;
  // creatorType?: CreatorType.SELF;
  statusVerify?: StatusVerify;
  fieldsCreator?: ICreatorFields;
  dateBeforeSendConfirmation?: string;
}

export interface ITouristData {
  sex: Sex;
  region: string;
}

interface IUserInfo {
  photo?: string | File;
  name?: string;
  phone?: string;
  email?: string;
  id?: string;
  is_active?: boolean; //Бан статус
  is_superuser?: boolean;
  is_verified?: boolean;
}
export interface ICreatorInfo extends IUserInfo {
  role_id?: UserType.creator;
  dataUser?: ICreatorData;
}

export interface ITouristInfo extends IUserInfo {
  role_id?: UserType.tourist;
  dataUser?: ITouristData;
}
