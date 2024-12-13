import { Tax_rate } from "./taxRate";

type Product = {
  cost: string;
  created_at: string;
  description: string;
  id: number;
  inventory: true;
  max: number;
  min: number;
  name: string;
  price: string;
  sku: string;
  stock: number;
  tax_rate: Tax_rate;
  tax_rate_id: number;
  upc: number;
  updated_at: string;
};

type ProductContext = {
  selection: number | null;
  setSelection: React.Dispatch<React.SetStateAction<number | null>>;
}

type ProductShowOutlet = {
  selection: ProductContext;
  productData: {product: Product, isError: boolean, isPending: boolean, isSuccces: boolean};
}

export { Product, ProductContext, ProductShowOutlet}