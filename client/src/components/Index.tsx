import { Container } from "@mui/material";

function Index() {
  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 3 }}>
      <div id="panes">
        <div className="pane pane-full">
          <div className="pane-inner">
            <h1>Welcome to the WorkOrder app!</h1>
            <p>
              This is the index.tsx file where I'll have information about the
              app, and how to use it.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { Index };
