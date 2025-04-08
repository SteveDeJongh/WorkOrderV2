import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";
import { FormLabel } from "@mui/material";

type Props = {
  title: string;
  id: string;
  name: string;
  value: number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  dis?: boolean;
  req?: boolean;
  placeholder?: string | number;
  error: FieldError | undefined;
  keepSpinner?: boolean;
};

function FormNumberInput(props: Props) {
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
        placeholder={props.placeholder ? String(props.placeholder) : ""}
        type={"number"}
        inputMode="numeric"
        sx={
          props.keepSpinner
            ? {}
            : {
                "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                "input[type=number]": {
                  MozAppearance: "textfield",
                },
              }
        }
        error={!!props.error}
        helperText={props.error ? props.error.message : null}
      ></TextField>
    </Box>
  );
}

export { FormNumberInput };
