import axios from "axios";
import { urlCreatorTours } from "../../config/config";
import { ITour } from "../../models/tourCardModel/ITour";

export const getMyTourById = async (
  successCallback: (prop: ITour) => void,
  id: string,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlCreatorTours + `/templates/${id}`, {
      withCredentials: true,
    });
    successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
