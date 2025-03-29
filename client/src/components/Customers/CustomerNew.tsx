import { CustomerForm } from "./CustomerForm";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { EditableCustomerData } from "../../types/customers";
import { Box, Typography } from "@mui/material";

function CustomerNew() {
  const navigate = useNavigate();

  async function handleCreateSubmit(rawData: EditableCustomerData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      const response = await createCustomer(formData);
      navigate(`/customers/${response.id}/profile`);
    } catch (e) {
      console.error("Failed to create customer: ", e);
    }
  }

  return (
    <Box p={1}>
      <Typography variant="h4">New Customer</Typography>
      <br></br>
      <br></br>
      <CustomerForm
        headerText={`New Customer`}
        buttonText={"Create"}
        onSubmit={handleCreateSubmit}
        onCancel={() => navigate("/customers/1")}
      />
    </Box>
  );
}

export { CustomerNew };
