import CustomerForm from "./CustomerForm";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";

function CustomerNew() {
  const navigate = useNavigate();

  async function handleCreateSubmit(rawData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      const response = await createCustomer(formData);
      navigate(`/customers/${response.id}/profile`);
    } catch (e) {
      console.error("Failed to create customer: ", e);
    }
  }

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          <CustomerForm
            headerText={`New Customer`}
            buttonText={"Create"}
            onSubmit={handleCreateSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default CustomerNew;
