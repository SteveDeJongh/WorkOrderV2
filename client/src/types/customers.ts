type Customer = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postal: string;
    created_at: string;
    updated_at: string;
}

type EditableCustomerCata = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postal: string;
}

export { Customer, EditableCustomerCata}