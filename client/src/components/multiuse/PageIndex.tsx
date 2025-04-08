import { Box, Typography } from "../../utils/muiImports";

type props = {
  title: string;
};

function PageIndex({ title }: props) {
  return (
    <Box className="pane-inner">
      <Typography variant="h6">No {title} selected.</Typography>
    </Box>
  );
}

export { PageIndex };
