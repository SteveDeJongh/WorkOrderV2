import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormLabel } from "../../utils/muiImports";

type Props = {
  title: string;
  id: string;
  name: string;
  value: string;
};

function ProfileTextField(props: Props) {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }} htmlFor={props.id}>
        {props.title}
      </FormLabel>
      <TextField
        fullWidth
        margin="dense"
        size="small"
        id={props.id}
        name={props.name}
        value={props.value}
        disabled={true}
      ></TextField>
    </Box>
  );
}

export { ProfileTextField };
