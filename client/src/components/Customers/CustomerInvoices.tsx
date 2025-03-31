import { useQuery } from "@tanstack/react-query";
import { fetchCustomerInvoices } from "../../services/customerServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Invoice } from "../../types/invoiceTypes";
import { INVOICECOLUMNS } from "../columns";
import { Typography } from "../../utils/muiImports";

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
    return (
      <Typography variant="h1" component={"h1"}>
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h1" component={"h1"}>
        Error
      </Typography>
    );
  }

  function onClick(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}/`);
  }

  return (
    <ScrollableTableTall
      columns={INVOICECOLUMNS}
      data={data}
      onClick={(invoice: Invoice) => onClick(invoice)}
    />
  );
}

export { CustomerInvoices };
