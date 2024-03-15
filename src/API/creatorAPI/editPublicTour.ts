import axios from "axios";
import { urlCreatorTours } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const editPublicTour = async (
  data: IPublicTour,
  successCallback?: ({
    publicTourId,
    cancelDeadline,
    updateDeadline,
    tourName,
  }: {
    publicTourId: string;
    cancelDeadline: string;
    updateDeadline: string;
    tourName: string;
  }) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.put(
      urlCreatorTours + `/public/${data.publicTourId}`,
      data,
      { withCredentials: true }
    );
    successCallback && successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
