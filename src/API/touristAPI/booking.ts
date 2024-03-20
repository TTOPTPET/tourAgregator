import { urlBookings } from "../../config/config";
import axios from "axios";
import { ITourBookingData } from "../../models/tourModels/ITourBookingData";

export const booking = async (
  data: ITourBookingData,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlBookings + "/create", data, {
      withCredentials: true,
    });
    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
