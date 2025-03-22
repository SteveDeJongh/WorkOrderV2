import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { Container, Grid2 } from "@mui/material";

function Layout() {
  return (
    <>
      <Grid2 container direction="column" style={{ minHeight: `100vh` }}>
        <Grid2>
          <Header />
        </Grid2>
        <Grid2>
          <Outlet />
        </Grid2>
        <Grid2>
          <Footer />
        </Grid2>
      </Grid2>
    </>
  );
}

export { Layout };
