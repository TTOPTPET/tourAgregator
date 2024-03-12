import { urlCreatorTours } from "../../config/config";
import axios from "axios";

export const deleteTour = async (
  tourId: string,
  successCallback: (params: any) => void,
  editedCallback?: (prop: any) => void,
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
    if (e?.response?.status === 300) {
      editedCallback && editedCallback(e.response?.data);
    }
    console.error(e);
    errorCallback && errorCallback();
  }
};
