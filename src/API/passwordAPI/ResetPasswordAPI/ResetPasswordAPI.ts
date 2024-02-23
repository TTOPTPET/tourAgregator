import axios from "axios";
import { urlUser } from "../../../config/config";
import { IResetPassword } from "../../../models/passwordModels/IResetPassword";

export const resetPassword = async (
  successCallback: (prop: number) => void,
  data?: IResetPassword,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(urlUser + "/reset-password", {
      ...data,
    });

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
