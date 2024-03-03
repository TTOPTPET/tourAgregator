import axios from "axios";
import { urlTour } from "../../config/config";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { cloneDeep } from "lodash";

const addTourDefault: IAddTour = {};

export const addTour = async (
  successCallback: (prop: IAddTour) => void,
  data: IAddTour,
  photos?: string[],
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(addTourDefault);
    return;
  }
  try {
    const dataWihoutPhotos = cloneDeep(data);
    if ("photos" in dataWihoutPhotos) {
      delete dataWihoutPhotos.photos;
    }
    const tourPhotos = [] as string[];
    photos &&
      photos!.length > 0 &&
      photos?.map((photo) => {
        tourPhotos.push(photo);
      });

    const addData = { ...dataWihoutPhotos, tourPhotos };

    let respone = await axios.post(urlTour + "/templates/create", addData, {
      withCredentials: true,
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
