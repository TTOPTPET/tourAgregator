import { urlCreatorTours } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { cloneDeep } from "lodash";

export const editTourAPI = async (
  tourId: string,
  data: IAddTour,
  photos?: string[],
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  try {
    const dataWihoutPhotos = cloneDeep(data);
    if ("photos" in dataWihoutPhotos) {
      delete dataWihoutPhotos.photos;
    }
    const tourPhotos = [] as string[];
    data.photos?.map((photo) => {
      if (typeof photo === "string") {
        tourPhotos.push(photo);
      }
    });
    photos &&
      photos!.length > 0 &&
      photos?.map((photo) => {
        tourPhotos.push(photo);
      });

    const editData = { ...dataWihoutPhotos, tourPhotos };

    await axios.put(urlCreatorTours + `/templates/${tourId}`, editData, {
      withCredentials: true,
    });
    successCallback && successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
