import axios from "axios";
import { urlUser } from "../../../config/config";

export const forgotPassword = async (
  successCallback: (prop: number) => void,
  email?: string,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(urlUser + "/forgot-password", {
      email,
    });

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
