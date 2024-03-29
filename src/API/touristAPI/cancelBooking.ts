import { urlBookings } from "../../config/config";
import axios from "axios";

export const cancelBooking = async (
  bookingId: string,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlBookings + `/${bookingId}`, undefined, {
      withCredentials: true,
    });
    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
