import InvoiceForm from "./InvoiceForm";
import { useNavigate } from "react-router-dom";
import { createInvoice } from "../../services/invoiceServices";
import { objectToFormData } from "../../utils/formDataHelper";

function InvoiceNew() {
  const navigate = useNavigate();

  async function handleCreateSubmit(rawData) {
    try {
      const formData = objectToFormData({ invoice: rawData });
      const response = await createInvoice(formData);
      navigate(`/invoices/${response.id}/view`);
    } catch (e) {
      console.error("Failed to save invoice: ", e);
    }
  }

  return (
    <>
      <div className="pane-inner">
        <InvoiceForm
          headerText={`New Invoice`}
          buttonText={"Save"}
          onSubmit={handleCreateSubmit}
          handleCancel={() => navigate("/invoices")}
        />
      </div>
    </>
  );
}

export default InvoiceNew;
