import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { FullWidthTable } from "../multiuse/FullWidthTable/FullWidthTable";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { useCustomersData } from "../../hooks/useCustomersData";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { CUSTOMERCOLUMNOPTIONS, CUSTOMERCOLUMNS } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";
import { Card, Grid2, Typography } from "../../utils/muiImports";

function Customers() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(user!.preferences.view_customers);
  const { id } = useParams();

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", "/customers");
    }

    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_customers: newView,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/customers" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <Grid2 container direction="column" spacing={5} mx={5} my={3}>
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography component={"h4"} variant="h4">
              Customers
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
            <Grid2 size={{ xs: 3 }} sx={{ display: "flex", height: "78vh" }}>
              <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                <LeftListWithAction
                  title={"Customers"}
                  linkToPage={"profile"}
                  getter={useCustomersData}
                />
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 9 }} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                {renderNoSelection ? (
                  <NoSelection item={"customer"} />
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
              Customers
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row">
            <FullWidthTable
              title={"Customers"}
              fetcher={useCustomersData}
              columns={CUSTOMERCOLUMNS}
              colPreferences={user!.preferences.customer_columns}
              colOptions={CUSTOMERCOLUMNOPTIONS}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}

export { Customers };
