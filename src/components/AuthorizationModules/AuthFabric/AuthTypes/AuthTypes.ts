export interface ITextProps {
  name: string;
  value: string | null;
  type: string;
  required: boolean;
  error: boolean;
}

export interface ILoginComponent {
  username: ITextProps;
  password: ITextProps;
}

export interface IRegisterComponent {
  email: ITextProps;
  name: ITextProps;
  phone: ITextProps;
  password: ITextProps;
  passwordSecond: ITextProps;
}
