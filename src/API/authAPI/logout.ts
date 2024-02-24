import axios from "axios";
import { urlUser } from "../../config/config";

export const logout = async (
  successCallback: (prop: number) => void,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(
      urlUser + "/logout",
      {},
      { withCredentials: true }
    );

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
