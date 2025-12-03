export interface ISale {
  _id: string;
  date: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
}

export interface ITotalSale {
  day: string;
  totalSale: number;
}

export interface ISalesResponse {
  results: {
    TotalSales: ITotalSale[];
    Sales: ISale[];
  };
  pagination: {
    before: string;
    after: string;
  };
}

export interface IFilters {
  startDate: string;
  endDate: string;
  priceMin: string;
  email: string;
  phone: string;
  sortBy: "date" | "price";
  sortOrder: "asc" | "desc";
  after: string;
  before: string;
}
