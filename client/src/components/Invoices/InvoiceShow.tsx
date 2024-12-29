import { InvoiceForm } from "../Invoices/InvoiceForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchInvoiceData } from "../../services/invoiceServices";
import { LoadingBox } from "../multiuse/LoadingBox";

function InvoiceShow() {
  const { id } = useParams();
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["fetchInvoice", id],
    queryFn: () => fetchInvoiceData(id),
  });

  if (isPending) {
    return <LoadingBox text="Loading Invoice..." />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="pane-inner">
        <InvoiceForm modalForm={false} buttonText={"Save"} invoiceData={data} />
      </div>
    </>
  );
}

export { InvoiceShow };
