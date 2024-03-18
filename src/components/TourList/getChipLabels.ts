import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";

export enum ChipLabelType {
  prices = "Цена",
  recommendedAge = "Рекомендуемый возраст",
  tourdate = "Дата",
  maxPersonNumber = "Колличество человек",
  category = "Категория тура",
  complexity = "Сложность тура",
  region = "Регион проведения",
  searchParam = "Название",
}

const getChipLabels = (searchData: ISearchRequest): string[] => {
  const nonEmptySearchValues: string[] = [];
  Object.keys(searchData).forEach((key) => {
    switch (key as keyof ISearchRequest) {
      case "category":
        searchData["category"] &&
          searchData.category.length > 0 &&
          nonEmptySearchValues.push(ChipLabelType.category);
        break;
      case "complexity":
        searchData["complexity"] &&
          searchData.complexity.length > 0 &&
          nonEmptySearchValues.push(ChipLabelType.complexity);
        break;
      case "prices":
        if (!searchData["prices"]) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.prices);
        break;
      case "recommendedAge":
        if (!searchData["recommendedAge"]) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.recommendedAge);
        break;
      case "region":
        if (!searchData["region"] || searchData["region"] === "") {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.region);
        break;
      case "tourdate":
        if (
          !searchData["tourdate"] ||
          !searchData?.tourdate?.dateFrom ||
          searchData?.tourdate?.dateFrom === "" ||
          !searchData?.tourdate?.dateTo ||
          searchData?.tourdate?.dateTo === ""
        ) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.tourdate);
        break;
      case "maxPersonNumber":
        if (!searchData["maxPersonNumber"]) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.maxPersonNumber);
        break;
      case "searchParam":
        if (!searchData["searchParam"] || searchData["searchParam"] === "") {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.searchParam);
        break;
    }
  });
  return nonEmptySearchValues;
};

export default getChipLabels;
