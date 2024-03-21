import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IStatistic } from "../../models/statisticModels/IStatistic";
import { IStatisticSearch } from "../../models/statisticModels/IStatisticSearch";

const getStatistic = async (
  data: IStatisticSearch,
  successCallback: (prop: IStatistic[]) => void,
  errorCallback?: () => void
) => {
  try {
    const response = await axios.post(creatorUrl + "/tours/statistics", data, {
      withCredentials: true,
    });

    successCallback(response.data.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export default getStatistic;
