import { useQuery } from "@tanstack/react-query";
import { fetchCustomerInvoices } from "../../services/customerServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Invoice } from "../../types/invoiceTypes";
import { INVOICECOLUMNS } from "./columns";

function CustomerInvoices() {
  const navigate = useNavigate();
  const { id: customerId } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["customerInvoices", { id: customerId }],
    queryFn: () =>
      customerId ? fetchCustomerInvoices(Number(customerId)) : [],
    gcTime: 0,
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  function onClick(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}/`);
  }

  return (
    <div className="main-pane-content">
      <ScrollableTableTall
        columns={INVOICECOLUMNS}
        data={data}
        onClick={(invoice: Invoice) => onClick(invoice)}
      />
    </div>
  );
}

export { CustomerInvoices };
