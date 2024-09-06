type CatalogItemImages = {
  height: number;
  width: number;
  url: string;
};

type CatalogItem = {
  id: string;
  name: string;
  images?: CatalogItemImages[];
};

export type Catalog = {
  [key: string]: {
    items: CatalogItem[];
  };
};
