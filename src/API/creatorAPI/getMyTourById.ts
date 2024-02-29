import axios from "axios";
import { creatorUrl } from "../../config/config";
import { ITour } from "../../models/tourCardModel/ITour";

export const getMyTourById = async (
  successCallback: (prop: ITour) => void,
  id: string,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(creatorUrl + `/myTours/${id}`);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
