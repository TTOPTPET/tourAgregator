import { urlTour } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";

export const editTourAPI = async (
  tourId: string,
  data: IAddTour,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  try {
    let formData = new FormData();
    formData.append("tourName", data?.tourName as string);
    formData.append("tourDescription", data?.tourDescription as string);
    formData.append("mapPoints", JSON.stringify(data.mapPoints));
    formData.append(
      "additionalServices",
      JSON.stringify(data.additionalServices)
    );
    formData.append("freeServices", JSON.stringify(data.freeServices));
    formData.append(
      "recommendedAgeFrom",
      JSON.stringify(data.recommendedAgeFrom)
    );
    formData.append("recommendedAgeTo", JSON.stringify(data.recommendedAgeTo));
    formData.append("region", data.region as string);
    formData.append("category", data.category as string);
    formData.append("complexity", data.complexity as string);
    data.photos?.forEach((photo) => formData.append("tourPhotos", photo));

    await axios.put(urlTour + `/templates/${tourId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    successCallback && successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
