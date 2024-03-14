import { urlCreatorTours } from "../../config/config";
import axios from "axios";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const getPublicTours = async (
  params: {
    year: number;
  },
  successCallback: (prop: IPublicTour[]) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlCreatorTours + "/public", {
      params,
      withCredentials: true,
    });
    successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
