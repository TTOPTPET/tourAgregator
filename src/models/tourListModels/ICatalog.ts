export enum Catalog {
  category = "category",
  complexity = "complexity",
  country = "country",
}

export interface ICatalog {
  code: string;
  name: string;
}
