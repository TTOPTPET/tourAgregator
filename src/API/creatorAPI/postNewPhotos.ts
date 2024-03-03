import { urlFiles } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";

export const postNewPhotos = async (
  data: IAddTour,
  successCallback?: (prop: string[]) => void,
  errorCallback?: () => void
) => {
  try {
    let formData = new FormData();

    data.photos?.map((photo) => {
      if (typeof photo === "object") {
        formData.append("tourPhotos", photo as File);
      }
    });

    let response = await axios.post(urlFiles + `/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    successCallback && successCallback(response?.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
