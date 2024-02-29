import axios from "axios";
import { urlTour } from "../../config/config";
import { ITour } from "../../models/tourCardModel/ITour";

export const getMyTourById = async (
  successCallback: (prop: ITour) => void,
  id: string,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlTour + `/templates/${id}`, {
      withCredentials: true,
    });
    successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
