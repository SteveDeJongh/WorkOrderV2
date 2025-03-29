import {
  Pageview,
  PageviewOutlined,
  ViewList,
  ViewListOutlined,
} from "@mui/icons-material";
import { Button, ButtonGroup, Grid2, Typography } from "@mui/material";

type props = {
  view: string;
  setView: Function;
};

function ViewToggle({ view, setView }: props) {
  function onBtnClick(v: string) {
    setView(v);
  }

  return (
    <>
      <Grid2 container direction="row" alignItems={"center"}>
        <Typography component="h6" variant="h6" pr={1}>
          View:
        </Typography>
        <ButtonGroup size="small">
          <Button onClick={() => onBtnClick("profile")}>
            {view === "profile" ? (
              <Pageview fontSize="large" />
            ) : (
              <PageviewOutlined fontSize="large" />
            )}
          </Button>
          <Button onClick={() => onBtnClick("table")}>
            {view === "table" ? (
              <ViewList fontSize="large" />
            ) : (
              <ViewListOutlined fontSize="large" />
            )}
          </Button>
        </ButtonGroup>
      </Grid2>
    </>
  );
}

export { ViewToggle };
