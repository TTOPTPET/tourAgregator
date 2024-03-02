import axios from "axios";
import { urlTour } from "../../config/config";
import { IAddTour } from "../../models/addTourModels/IAddTour";

const addTourDefault: IAddTour = {};

export const addTour = async (
  successCallback: (prop: IAddTour) => void,
  data: IAddTour,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(addTourDefault);
    return;
  }
  try {
    let formData = new FormData();
    formData.append("tourName", data?.tourName as string);
    formData.append("tourDescription", data?.tourDescription as string);
    formData.append("mapPoints", JSON.stringify(data.mapPoints));
    if (
      data.additionalServices &&
      data.additionalServices.length !== 0 &&
      data.additionalServices[0] !== ""
    ) {
      formData.append(
        "additionalServices",
        JSON.stringify(data.additionalServices)
      );
    }
    if (
      data.freeServices &&
      data.freeServices.length !== 0 &&
      data.freeServices[0] !== ""
    ) {
      formData.append("freeServices", JSON.stringify(data.freeServices));
    }
    formData.append(
      "recommendedAgeFrom",
      JSON.stringify(data.recommendedAgeFrom)
    );
    formData.append("recommendedAgeTo", JSON.stringify(data.recommendedAgeTo));
    formData.append("region", data.region as string);
    formData.append("category", data.category as string);
    formData.append("complexity", data.complexity as string);
    data.photos?.forEach((photo) => formData.append("tourPhotos", photo));

    let respone = await axios.post(urlTour + "/templates/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
