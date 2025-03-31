import { CircularProgress, Stack, Typography } from "../../utils/muiImports";

type Props = {
  text: string;
};

function LoadingBox({ text }: Props) {
  return (
    <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
      <Typography p={3} variant="body1">
        {text}
      </Typography>
    </Stack>
  );
}

export { LoadingBox };
