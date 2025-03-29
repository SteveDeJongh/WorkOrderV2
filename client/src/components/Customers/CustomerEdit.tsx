import { useNavigate } from "react-router-dom";
import { editCustomer } from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { CustomerForm } from "./CustomerForm";
import { Customer, EditableCustomerData } from "../../types/customers";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  mainData: Customer;
  setMainData: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

function CustomerEdit({ mainData, setMainData, setTab }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleEditSubmit(rawData: EditableCustomerData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      const response = await editCustomer(mainData.id, formData);
      setMainData(response);
      navigate(`/customers/${mainData.id}/profile`);
      queryClient.invalidateQueries({ queryKey: ["customersSearch"] });
    } catch (e) {
      console.error("Failed to edit customer: ", e);
    }
  }

  return (
    <CustomerForm
      customer={mainData}
      headerText={`Edit Customer`}
      buttonText={"Save"}
      onSubmit={handleEditSubmit}
      onCancel={() => setTab(0)}
    />
  );
}

export { CustomerEdit };
