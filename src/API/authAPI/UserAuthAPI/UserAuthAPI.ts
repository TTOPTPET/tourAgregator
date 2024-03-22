import axios from "axios";
import { urlUser } from "../../../config/config";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { IAuthResponse } from "../../../models/authModels/IAuthResponse";
import { cloneDeep } from "lodash";
import { ICheckINNResponse } from "../../../models/authModels/ICheckINNResponse";

// const userAuthDefault: IAuthResponse = {
//   sessionToken: "SESSION",
// };

const checkINNDefault = {
  status: true,
};

export const loginUser = async (
  data: IUserLogin,
  successCallback: (prop: IAuthResponse) => void,
  errorCallback?: (prop: any) => void,
  useDefault?: boolean
) => {
  try {
    let response = await axios.post<IAuthResponse>(urlUser + "/login", data, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });

    successCallback && successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const registerUser = async (
  successCallback: (prop: number) => void,
  data: IUserRegister,
  errorCallback?: (prop: any) => void,
  useDefault?: boolean
) => {
  let copyData = cloneDeep(data);
  delete copyData.passwordSecond;
  try {
    let response = await axios.post(urlUser + "/register", copyData);

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const requestVerifyToken = async (
  successCallback: (prop: number) => void,
  email?: string,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(urlUser + "/request-verify-token", {
      email,
    });

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const verify = async (
  successCallback: (prop: number) => void,
  token: string,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(urlUser + "/verify", {
      token,
    });

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const checkINN = async (
  successCallback: (prop: ICheckINNResponse) => void,
  inn?: string,
  errorCallback?: (prop: any) => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(checkINNDefault);
    return;
  }
  try {
    let response = await axios.post(urlUser + `/${inn}`);

    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const deleteUser = async (
  id: string,
  successCallback: (prop: number) => void,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.delete(urlUser + `/${id}`, {
      withCredentials: true,
    });

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
