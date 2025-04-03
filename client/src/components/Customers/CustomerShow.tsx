import { MainPaneNav } from "../multiuse/MainPaneNav";
import { fetchCustomerData } from "../../services/customerServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingBox } from "../multiuse/LoadingBox";
import { Customer } from "../../types/customers";
import { Box, Typography } from "../../utils/muiImports";
import { CustomTabPanel } from "../Users/CustomTabPanel";
import { CustomerProfile } from "./CustomerProfile";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerInvoices } from "./CustomerInvoices";

function CustomerShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState<Customer>();

  const { id } = useParams();

  useEffect(() => {
    async function loadCustomerData() {
      if (!id) {
        setMainData(undefined);
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(Number(id));
        setMainData(response);
      } catch (e) {
        setMainError(true);
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [id]);

  // Nav Tabs
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      {mainError && (
        <Typography component={"h5"} variant="h5">
          An error occured.
        </Typography>
      )}
      {mainLoading && <LoadingBox text="Loading Customer..." />}
      {!mainLoading && mainData && (
        <Box p={1}>
          <MainPaneNav
            title={`${mainData.first_name} ${mainData.last_name}`}
            id={mainData.id}
            identifier={"Customer"}
            pages={["Profile", "Edit", "Invoices"]}
            tab={tab}
            handleChange={handleChange}
          />
          <CustomTabPanel value={tab} index={0}>
            <CustomerProfile mainData={mainData} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <CustomerEdit
              mainData={mainData}
              setMainData={setMainData}
              setTab={setTab}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={2}>
            <CustomerInvoices />
          </CustomTabPanel>
        </Box>
      )}
    </>
  );
}

export { CustomerShow };
