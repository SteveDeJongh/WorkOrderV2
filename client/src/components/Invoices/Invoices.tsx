import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { FullWidthTable } from "../multiuse/FullWidthTable/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { useInvoicesData } from "../../hooks/useInvoicesData";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { INVOICECOLUMNOPTIONS, INVOICECOLUMNSALT } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";
import { Card, Grid2, Typography } from "@mui/material";

function Invoices() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.preferences.view_invoices || "profile"
  );
  const { id } = useParams();

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", "/invoices");
    }
    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_invoices: newView,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/invoices" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <Grid2 container direction="column" spacing={5} mx={5} my={3}>
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography component={"h4"} variant="h4">
              Invoices
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
            <Grid2 size={{ xs: 3 }} sx={{ display: "flex", height: "78vh" }}>
              <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                <LeftListWithAction
                  title={"Invoices"}
                  linkToPage={""}
                  getter={useInvoicesData}
                />
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 9 }} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 0, width: "100%" }}>
                {renderNoSelection ? (
                  <NoSelection item={"invoice"} />
                ) : (
                  <Outlet />
                )}
              </Card>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
      {view === "table" && (
        <Grid2 container direction="column" spacing={5} m={5}>
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography component={"h4"} variant="h4">
              Invoices
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row">
            <FullWidthTable
              title={"Invoices"}
              fetcher={useInvoicesData}
              columns={INVOICECOLUMNSALT}
              colPreferences={user!.preferences.invoice_columns}
              colOptions={INVOICECOLUMNOPTIONS}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}

export { Invoices };
