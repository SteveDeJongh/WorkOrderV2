import { Customer } from "./customers";
import { Invoice } from "./invoiceTypes";
import { Product } from "./products";

type GetterFunction = (searchTerm: string) => {
  data: Customer[] | Product[] | Invoice[];
  loading: boolean;
  error: Error | null;
};

export { GetterFunction} ;