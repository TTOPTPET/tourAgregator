import axios from "axios";
import { IUserList } from "../../../models/adminModels/IUserList";
import { adminUrl } from "../../../config/config";

export const banUser = async (
  successCallback: (prop: IUserList[]) => void,
  id: number,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(
      adminUrl + `/users/block/${id}`,
      undefined,
      {
        withCredentials: true,
      }
    );
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const unbanUser = async (
  successCallback: (prop: IUserList[]) => void,
  id: number,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(
      adminUrl + `/users/unblock/${id}`,
      undefined,
      {
        withCredentials: true,
      }
    );
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
