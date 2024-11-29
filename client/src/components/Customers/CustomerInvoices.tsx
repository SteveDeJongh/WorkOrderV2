import { useQuery } from "@tanstack/react-query";
import { fetchCustomerInvoices } from "../../services/customerServices";
import { useParams, useNavigate } from "react-router-dom";
import ScrollableTableTall from "../../multiuse/ScrollableTableTall";
import { Invoice } from "../../types/invoiceTypes";

function CustomerInvoices() {
  const navigate = useNavigate();
  const { id: customerId } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["customerInvoices", customerId],
    queryFn: () => fetchCustomerInvoices(customerId),
    gcTime: 0,
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  const columns = [
    { name: "Invoice ID", propName: "id" },
    { name: "Status", propName: "status" },
    { name: "Total", propName: "total" },
    { name: "Tax", propName: "tax" },
    { name: "Balance", propName: "balance" },
    { name: "Updated", propName: "updated_at" },
    { name: "Created", propName: "created_at" },
  ];

  function onClick(invoice: Invoice) {
    navigate(`/navigate/${invoice.id}/`);
  }

  return (
    <>
      <ScrollableTableTall
        columns={columns}
        data={data}
        onClick={(invoice: Invoice) => onClick(invoice)}
      />
    </>
  );
}

export default CustomerInvoices;
