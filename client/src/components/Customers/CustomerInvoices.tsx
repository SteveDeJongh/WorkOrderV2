import { useQuery } from "@tanstack/react-query";
import { fetchCustomerInvoices } from "../../services/customerServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Invoice } from "../../types/invoiceTypes";
import { INVOICECOLUMNS } from "../columns";
import { Typography } from "../../utils/muiImports";
import { LoadingBox } from "../multiuse/LoadingBox";

function CustomerInvoices() {
  const navigate = useNavigate();
  const { id: customerId } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["customerInvoices", { id: customerId }],
    queryFn: () =>
      customerId ? fetchCustomerInvoices(Number(customerId)) : [],
    gcTime: 0,
  });

  function onClick(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}/`);
  }

  return (
    <>
      {isPending && <LoadingBox text="Loading Invoices..." />}
      {isError && (
        <Typography variant="h5" component={"h5"}>
          Error
        </Typography>
      )}
      {!isPending && !isError && (
        <ScrollableTableTall
          columns={INVOICECOLUMNS}
          data={data}
          onClick={(invoice: Invoice) => onClick(invoice)}
        />
      )}
    </>
  );
}

export { CustomerInvoices };
