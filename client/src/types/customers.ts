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

type EditableCustomerData = {
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

type CustomerContext = {
  mainData: Customer;
  setMainData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

type CustomerWithNotices = Customer & {
  notices?: CustomerNotice[];
};

type CustomerNotice = {
  id: number;
  notice: string;
};

// User defined type-guard, returns type predicate.
function isCustomer(customer: Customer | Object): customer is Customer {
  return (customer as Customer).first_name !== undefined && (customer as Customer).last_name !== undefined;
}

export { Customer, CustomerContext, CustomerWithNotices, CustomerNotice, EditableCustomerData, isCustomer}