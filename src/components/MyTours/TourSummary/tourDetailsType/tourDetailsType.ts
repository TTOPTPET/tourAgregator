import { ITourInfo } from "../../../../models/tourModels/ITourInfo";
import { IUserRecord } from "../../../../models/userModels/IUserRecord";

interface ITourInfoComponent extends ITourInfo {
  type: "tourInfo";
}

interface IUserRecordComponent extends IUserRecord {
  type: "record";
}

export type TourDetailsType = ITourInfoComponent | IUserRecordComponent;
