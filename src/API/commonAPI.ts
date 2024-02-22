import axios from "axios";
import { ICreatorInfo, ITouristInfo } from "../models/userModels/IUserInfo";
import { urlUser } from "../config/config";

export const getUserInfo = async (
  successCallback: (prop: ICreatorInfo | ITouristInfo) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlUser + "/me", { withCredentials: true });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
