import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { FullWidthTable } from "../multiuse/FullWidthTable/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { TColumn } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";
import {
  Box,
  Button,
  Card,
  ClickAwayListener,
  Drawer,
  Grid2,
  Typography,
  MenuIcon,
} from "../../utils/muiImports";
import { GetterFunction } from "../../types/utils";

type Props = {
  viewProp: "view_invoices" | "view_products" | "view_customers";
  resourcePath: "/invoices" | "/products" | "/customers";
  item: "invoice" | "product" | "customer";
  title: "Invoices" | "Products" | "Customers";
  getter: GetterFunction;
  columns: TColumn[];
  colPreferences: "invoice_columns" | "product_columns" | "customer_columns";
  colOptions: string[];
};

function ResourcePage({
  viewProp,
  resourcePath,
  item,
  title,
  getter,
  columns,
  colPreferences,
  colOptions,
}: Props) {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.preferences[viewProp] || "profile"
  );
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", resourcePath);
    }
    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      [viewProp]: newView,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = resourcePath === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <Grid2
          container
          direction="column"
          spacing={5}
          py={{ xs: 3 }}
          px={{ xs: 1, sm: 2 }}
          size={{ xs: 12 }}
        >
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography
              component={"h4"}
              variant="h4"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {title}
            </Typography>
            {/* For small screen resource selection */}
            <Button
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={() => setOpen(true)}
              endIcon={<MenuIcon />}
            >
              Select {title}
            </Button>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
            {/* Selection */}
            <Grid2
              size={{ sm: 3, xl: 2 }}
              sx={{ display: { xs: "none", sm: "flex" }, height: "78vh" }}
            >
              <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                <LeftListWithAction
                  title={title}
                  linkToPage={""}
                  getter={getter}
                />
              </Card>
            </Grid2>
            {/* Small screen resource selection */}
            <Drawer sx={{ display: { sm: "none" } }} open={open}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
                  <LeftListWithAction
                    title={title}
                    linkToPage={""}
                    getter={getter}
                  />
                </Card>
              </ClickAwayListener>
            </Drawer>
            {/* Data Display */}
            <Grid2 size={{ xs: 12, sm: 9, xl: 10 }} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 0, width: "100%" }}>
                {renderNoSelection ? (
                  <NoSelection item={item} />
                ) : (
                  // <Outlet />
                  <Card variant="outlined" sx={{ padding: 0, width: "100%" }}>
                    <Box
                      sx={{
                        overflowX: "hidden",
                        border: "2px dashed red",
                        width: "100%",
                      }}
                    >
                      <Outlet />
                    </Box>
                  </Card>
                )}
              </Card>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
      {view === "table" && (
        <Grid2
          container
          direction="column"
          spacing={2}
          py={{ xs: 3 }}
          px={{ xs: 1, sm: 2 }}
          sx={{
            overflow: "auto",
            // height: "88vh",
            // width: "100%",
          }}
          size={{ xs: 12 }}
        >
          <Grid2 container direction="row" justifyContent={"space-between"}>
            <Typography component={"h4"} variant="h4">
              {title}
            </Typography>
            <ViewToggle view={view} setView={viewSetter} />
          </Grid2>
          <Grid2 container direction="row" sx={{ width: "100%" }}>
            <FullWidthTable
              title={title}
              fetcher={getter}
              columns={columns}
              colPreferences={user!.preferences[colPreferences]}
              colOptions={colOptions}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}

export { ResourcePage };
