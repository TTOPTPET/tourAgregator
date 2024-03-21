import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IStatistic } from "../../models/statisticModels/IStatistic";
import { IStatisticSearch } from "../../models/statisticModels/IStatisticSearch";

const getStatistic = async (
  params: IStatisticSearch,
  successCallback: (prop: IStatistic[]) => void,
  errorCallback?: () => void
) => {
  try {
    const response = await axios.get<IStatistic[]>(creatorUrl + "/statistics", {
      params: params,
      withCredentials: true,
    });

    successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export default getStatistic;
