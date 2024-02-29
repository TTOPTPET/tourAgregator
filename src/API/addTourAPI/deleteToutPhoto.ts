import axios from "axios";
import { creatorUrl } from "../../config/config";

export const deleteToutPhoto = async (
  photoPath: string,
  tourId: string,
  successCallback: () => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback();
    return;
  }
  try {
    await axios.delete(creatorUrl + "/tour/photo", {
      params: {
        pathPhoto: photoPath,
        tourId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback();
  } catch (e) {
    errorCallback && errorCallback();
  }
};
