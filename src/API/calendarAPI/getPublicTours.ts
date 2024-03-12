import { creatorUrl } from "../../config/config";
import axios from "axios";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const getPublicTours = async (
  params: {
    year: string;
  },
  successCallback: (params: IPublicTour[]) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get<IPublicTour[]>(creatorUrl + "/public", {
      params,
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
