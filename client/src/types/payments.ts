type Payment = {
  amount: number;
  created_at?: string;
  updated_at?: string;
  id: number | string;
  invoice_id: number;
  method: string;
  _destroy?: boolean;
  change?: number | string;
};

export { Payment }