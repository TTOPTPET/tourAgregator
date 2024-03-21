import axios from "axios";
import { ICreatorInfo, ITouristInfo } from "../models/userModels/IUserInfo";
import { urlUser, urlTour } from "../config/config";
import { IErrorMessage } from "../models/errorMessageModels/IErrorMessage";
import { IQuestMessage } from "../models/errorMessageModels/IQuestMessage";

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

export const postClaim = async (
  data: IErrorMessage,
  successCallback: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlTour + "/claim/create", data, {
      withCredentials: true,
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const postAppeal = async (
  data: string,
  successCallback: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlTour + "/appeal/create", data, {
      withCredentials: true,
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const postQuest = async (
  data: IQuestMessage,
  successCallback: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlTour + "/quest", data, {
      withCredentials: true,
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
