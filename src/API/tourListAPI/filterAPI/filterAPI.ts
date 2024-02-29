import axios from "axios";
import { urlCatalog } from "../../../config/config";
import { Catalog, ICatalog } from "../../../models/tourListModels/ICatalog";

export const getCatalog = async (
  catalogName: Catalog,
  successCallback: (prop: ICatalog[]) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(urlCatalog + `/${catalogName}`);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
