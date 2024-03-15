import { SetStateAction, Dispatch } from "react";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";

export interface IFilterProps {
  filters: IFilter;
  searchData: ISearchRequest;
  setSearchData: Dispatch<SetStateAction<ISearchRequest>>;
  filtersLabels: string[];
  setFiltersLabels: Dispatch<SetStateAction<string[]>>;
}
