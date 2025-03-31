import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Grid2 } from "../utils/muiImports";

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
