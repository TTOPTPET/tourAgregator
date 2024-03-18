import axios from "axios";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { adminUrl } from "../../../config/config";

export const getClaimsList = async (
  successCallback: (prop: IUserMessage[]) => void,
  params: {
    page: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(adminUrl + "/claims/list", {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const confirmClaim = async (
  successCallback: (prop: IUserMessage[]) => void,
  params: {
    claimId: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(adminUrl + "/claims/confirm", undefined, {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const rejectClaim = async (
  successCallback: (prop: IUserMessage[]) => void,
  params: {
    claimId: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(adminUrl + "/claims/reject", undefined, {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const getAppealsList = async (
  successCallback: (prop: IUserMessage[]) => void,
  params: {
    page: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(adminUrl + "/appeals/list", {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const confirmAppeals = async (
  successCallback: (prop: IUserMessage[]) => void,
  params: {
    claimId: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(adminUrl + "/appeals/confirm", undefined, {
      params,
      withCredentials: true,
    });
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
