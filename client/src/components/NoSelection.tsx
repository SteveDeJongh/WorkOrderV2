import { Typography } from "@mui/material";

type Props = {
  item: string;
};

function NoSelection({ item }: Props) {
  return (
    <Typography component={"h1"} variant="h1">
      No {item} selected.
    </Typography>
  );
}

export { NoSelection };
