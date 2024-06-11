import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCustomerData,
  editCustomer,
} from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import CustomerForm from "./CustomerForm";

function CustomerEdit() {
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    async function loadCustomerData() {
      if (!id) {
        setCustomer({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [id]);

  async function handleEditSubmit(rawData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      await editCustomer(id, formData);
      navigate(`/customers/${id}/profile`);
    } catch (e) {
      console.error("Failed to create customer: ", e);
    }
  }

  return (
    <>
      <div className="pane-inner">
        {mainLoading && <p>Information loading...</p>}
        {mainError && <p>An error occured.</p>}
        {!mainLoading && !mainError && (
          <>
            <CustomerForm
              customer={customer}
              headerText={`Edit Customer`}
              buttonText={"Save"}
              onSubmit={handleEditSubmit}
            />
          </>
        )}
      </div>
    </>
  );
}

export default CustomerEdit;
