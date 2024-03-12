import axios from "axios";
import { urlCreatorTours } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const postNewPublic = async (
  data: IPublicTour,
  //   successCallback?: ({
  //     publicTourId,
  //     cancelDeadline,
  //     updateDeadline,
  //     tourAmountWithCommission,
  //   }: {
  //     publicTourId: string;
  //     cancelDeadline: string;
  //     updateDeadline: string;
  //     tourAmountWithCommission: number;
  //   }) => void,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlCreatorTours + "/public/create", data);
    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
