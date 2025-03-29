import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";
import { FormLabel } from "@mui/material";

type Props = {
  title: string;
  id: string;
  name: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  dis?: boolean;
  req?: boolean;
  placeholder?: string;
  type?: string;
  error: FieldError | undefined;
};

function FormTextInput(props: Props) {
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
        onChange={props.onChange}
        disabled={props.dis}
        required={props.req}
        placeholder={props.placeholder ? props.placeholder : ""}
        type={props.type ? props.type : ""}
        error={!!props.error}
        helperText={props.error ? props.error.message : null}
      ></TextField>
    </Box>
  );
}

export { FormTextInput };
