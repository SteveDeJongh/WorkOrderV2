import { Controller } from "react-hook-form";
import { Box, FormControl, FormLabel, Select } from "../../utils/muiImports";
import { ReactNode } from "react";

type Props = {
  id: string;
  name: string;
  control: any;
  title: string;
  defaultValue: number | string;
  children: ReactNode;
};

const FormSelectInput = (props: Props) => {
  return (
    <Box>
      <FormLabel style={{ fontWeight: "bold" }} htmlFor={props.id}>
        {props.title}
      </FormLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        render={({ field }) => {
          return (
            <Select fullWidth size="small" sx={{ marginY: 1 }} {...field}>
              {props.children}
            </Select>
          );
        }}
      />
    </Box>
  );
};

export { FormSelectInput };
