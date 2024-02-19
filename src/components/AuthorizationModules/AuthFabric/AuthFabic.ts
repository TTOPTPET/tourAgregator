import { ILoginComponent, IRegisterComponent } from "./AuthTypes/AuthTypes";

export const AuthComponent = (
  type: string
): ILoginComponent | IRegisterComponent | undefined => {
  switch (type) {
    case "login": {
      const loginComponent: ILoginComponent = {
        username: {
          name: "Логин",
          required: true,
          type: "",
          value: "",
          error: true,
        },
        password: {
          name: "Пароль",
          required: true,
          type: "password",
          value: "",
          error: true,
        },
      };
      return loginComponent;
    }
    case "register": {
      const registerComponent: IRegisterComponent = {
        email: {
          name: "Почта",
          required: true,
          type: "email",
          value: "",
          error: false,
        },
        name: {
          name: "Имя",
          required: true,
          type: "",
          value: "",
          error: false,
        },
        phone: {
          name: "Телефон",
          required: true,
          type: "number",
          value: null,
          error: false,
        },
        password: {
          name: "Пароль",
          required: true,
          type: "password",
          value: "",
          error: false,
        },
        passwordSecond: {
          name: "Повторите пароль",
          required: true,
          type: "password",
          value: "",
          error: false,
        },
      };

      return registerComponent;
    }
  }
};
