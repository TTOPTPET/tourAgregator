import { urlCreatorTours } from "../../config/config";
import axios from "axios";

export const deletePostedTour = async (
  id: string,
  successCallback?: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.delete(urlCreatorTours + `/public/${id}`, {
      withCredentials: true,
    });
    successCallback && successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
