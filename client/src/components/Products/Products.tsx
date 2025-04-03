import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { useProductsData } from "../../hooks/useProductsData";
import { FullWidthTable } from "../multiuse/FullWidthTable/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { syncUserPreference } from "../../services/userPreferencesServices";
import { PRODUCTCOLUMNOPTIONS, PRODUCTCOLUMNS } from "../columns";
import { Card, Grid2, Typography } from "../../utils/muiImports";

function Products() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.preferences.view_products || "profile"
  );
  const { id } = useParams();

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", "/products");
    }
    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_products: newView,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/products" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <Grid2 container direction="column" spacing={5} mx={5} my={3}>
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography component={"h4"} variant="h4">
              Products
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
            <Grid2 size={{ xs: 3 }} sx={{ display: "flex", height: "78vh" }}>
              <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                <LeftListWithAction
                  title={"Products"}
                  linkToPage={"view"}
                  getter={useProductsData}
                />
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 9 }} sx={{ display: "flex" }}>
              <Card
                variant="outlined"
                sx={{ padding: 1, height: "78vh", width: "100%" }}
              >
                {renderNoSelection ? (
                  <NoSelection item={"product"} />
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
              Products
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row">
            <FullWidthTable
              title={"Products"}
              fetcher={useProductsData}
              columns={PRODUCTCOLUMNS}
              colPreferences={user!.preferences.product_columns}
              colOptions={PRODUCTCOLUMNOPTIONS}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}

export { Products };
