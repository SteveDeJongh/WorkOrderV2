import { Typography } from "../utils/muiImports";

type Props = {
  item: string;
};

function NoSelection({ item }: Props) {
  return (
    <Typography component={"h6"} variant="h6">
      No {item} selected.
    </Typography>
  );
}

export { NoSelection };
