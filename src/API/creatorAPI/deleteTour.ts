import { urlCreatorTours } from "../../config/config";
import axios from "axios";

export const deleteTour = async (
  tourId: string,
  successCallback: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.delete(
      urlCreatorTours + `/templates/${tourId}`,
      {
        withCredentials: true,
      }
    );
    successCallback(response?.status);
  } catch (e: any) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const returnTour = async (
  params: {
    id: string;
  },
  successCallback: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlCreatorTours + `/templates/activate`, {
      withCredentials: true,
      params,
    });
    successCallback(response?.status);
  } catch (e: any) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
