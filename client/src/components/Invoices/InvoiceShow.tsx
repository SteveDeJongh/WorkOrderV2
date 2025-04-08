import { InvoiceForm } from "../Invoices/InvoiceForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchInvoiceData } from "../../services/invoiceServices";
import { LoadingBox } from "../multiuse/LoadingBox";
import { Alert } from "../../utils/muiImports";

function InvoiceShow() {
  const { id } = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["fetchInvoice", { id }],
    queryFn: () => fetchInvoiceData(Number(id)),
  });

  return (
    <>
      {error && <Alert color="error">{error.message}</Alert>}
      {isPending && <LoadingBox text="Loading Invoice..." />}
      {!isPending && data && (
        <InvoiceForm modalForm={false} buttonText={"Save"} invoiceData={data} />
      )}
    </>
  );
}

export { InvoiceShow };
