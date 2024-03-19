import axios from "axios";
import { IUserListResponse } from "../../../models/adminModels/IUserList";
import { adminUrl } from "../../../config/config";

export const getUsersList = async (
  successCallback: (prop: IUserListResponse) => void,
  params: {
    page: number;
    emailString: string;
    roleId: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(adminUrl + "/users/list", {
      params,
      withCredentials: true,
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
