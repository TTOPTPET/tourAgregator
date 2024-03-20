import axios from "axios";
import { urlBookings } from "../../config/config";
import { IUserRecord } from "../../models/userModels/IUserRecord";

export const getTouristRecords = async (
  params: {
    isFinished: boolean;
  },
  successCallback: (prop: IUserRecord[]) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlBookings + "/list", undefined, {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
