import { UserType } from "../userModels/IUserInfo";

export interface IUserRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordSecond?: string;
  typeUser: UserType | null;
}
