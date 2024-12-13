type Movement = {
  id: number,
  relation: string,
  adjustment: boolean,
  change: number,
  change_type: "Invoice" | "ProductEdit",
  user_id: number,
  created_at: string,
  updated_at: string,
  product_id: number,
  stock: number,
}

export { Movement }