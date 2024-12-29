import { useNavigate, useOutletContext } from "react-router-dom";
import { editCustomer } from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { CustomerForm } from "./CustomerForm";
import { CustomerContext, EditableCustomerData } from "../../types/customers";

function CustomerEdit() {
  const { mainData, setMainData } = useOutletContext<CustomerContext>();
  const navigate = useNavigate();

  async function handleEditSubmit(rawData: EditableCustomerData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      const response = await editCustomer(mainData.id, formData);
      setMainData(response);
      navigate(`/customers/${mainData.id}/profile`);
    } catch (e) {
      console.error("Failed to edit customer: ", e);
    }
  }

  return (
    <>
      <div className="pane-inner">
        <>
          <CustomerForm
            customer={mainData}
            headerText={`Edit Customer`}
            buttonText={"Save"}
            onSubmit={handleEditSubmit}
          />
        </>
      </div>
    </>
  );
}

export { CustomerEdit };
