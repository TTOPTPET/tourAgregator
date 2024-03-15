import axios from "axios";
import { urlCreatorTours } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const postNewPublic = async (
  data: IPublicTour,
  successCallback?: ({
    publicTourId,
    cancelDeadline,
    tourName,
  }: {
    publicTourId: string;
    cancelDeadline: string;
    tourName: string;
  }) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlCreatorTours + "/public/create", data, {
      withCredentials: true,
    });
    successCallback && successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
