import { urlCreatorTours } from "../../config/config";
import axios from "axios";
import { ITour } from "../../models/tourCardModel/ITour";

export const getMyTours = async (
  successCallback: (prop: ITour[]) => void,
  params: {
    isArchived: boolean;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlCreatorTours + "/templates", {
      withCredentials: true,
      params,
    });
    successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
