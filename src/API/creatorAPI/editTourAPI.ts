import { creatorUrl } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { cloneDeep } from "lodash";

export const editTourAPI = async (
  tourId: string,
  data: IAddTour,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  console.log(data);
  let formData = new FormData();
  const dataWithSavedPhotos = cloneDeep(data);
  dataWithSavedPhotos.photos = dataWithSavedPhotos.photos && [
    ...dataWithSavedPhotos.photos.filter((item) => typeof item === "string"),
  ];
  formData.append("data", JSON.stringify(dataWithSavedPhotos));
  data?.photos?.forEach((photo) => {
    if (typeof photo !== "string") {
      formData.append("creatorPhoto", photo);
    }
  });
  try {
    await axios.put(creatorUrl + "/tour", formData, {
      params: {
        tourId: tourId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback && successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
