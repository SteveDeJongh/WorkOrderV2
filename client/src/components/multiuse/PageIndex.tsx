import { Container, Typography } from "../../utils/muiImports";

type props = {
  title: string;
};

function PageIndex({ title }: props) {
  return (
    <>
      <Container className="pane-inner">
        <Typography variant="body1">No {title} selected</Typography>
      </Container>
    </>
  );
}

export { PageIndex };
