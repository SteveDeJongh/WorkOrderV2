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

type EditableProductData = {
  cost: string;
  description: string;
  inventory: true;
  max: number;
  min: number;
  name: string;
  price: string;
  sku: string;
  stock: number;
  tax_rate_id: number;
  upc: number;
}

type ProductContext = {
  mainData: Product;
  setMainData: React.Dispatch<React.SetStateAction<Product | null>>;
}

function isProduct(product: Product | Object): product is Product {
  return (product as Product).sku !== undefined && (product as Product).name !== undefined;
}

export { EditableProductData, Product, ProductContext, isProduct}