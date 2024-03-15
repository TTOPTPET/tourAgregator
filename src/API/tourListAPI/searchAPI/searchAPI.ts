import axios from "axios";
import { urlTour } from "../../../config/config";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { ITour } from "../../../models/tourCardModel/ITour";
import { ISearchResponse } from "../../../models/tourListModels/ISearchResponse";

export const getToursSorted = async (
  successCallback: (prop: ISearchResponse) => void,
  data: ISearchRequest,
  params: {
    page: number;
  },
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlTour + "/search", data, {
      params,
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
