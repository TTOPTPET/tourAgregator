import axios from "axios";
import { urlTour } from "../../config/config";
import { ITourInfo } from "../../models/tourModels/ITourInfo";

const responseDefault: ITourInfo = {
  category: "tracking",
  complexity: "5",
  dateFrom: "2023-04-10T16:00:00.000Z",
  dateTo: "2023-04-11T16:00:00.000Z",
  price: 10000,
  region: "22",
  tourName: "Пирамиды говна",
  tourDescription: "Говна наебни олух",
  recommendedAgeFrom: 14,
  recommendedAgeTo: 30,
  additionalServices: ["АБОБА", "уга буга"],
  freeServices: ["По ебалу", "Солевая альтуха"],
  meetingDatetime: "2023-04-10T16:00:00.000Z",
  maxPersonNumber: 20,
  vacancies: 10,
};

export const getTourInfo = async (
  tourId: string,
  successCallback: (prop: ITourInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(responseDefault);
    return;
  }
  try {
    let response = await axios.get(urlTour + `/${tourId}`);
    successCallback(response?.data?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
