import { ICatalog } from "./ICatalog";

export interface IFilter {
  regions: ICatalog[];
  category: ICatalog[];
  complexity: ICatalog[];
  maxPrice: number;
}
