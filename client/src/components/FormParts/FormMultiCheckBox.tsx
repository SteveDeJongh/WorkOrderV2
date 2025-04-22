import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Box, Checkbox } from "../../utils/muiImports";
import { CapitalizeFullName } from "../../utils";
import { FormControlLabel, ListItem } from "../../utils/muiImports";

type Props = {
  name: string;
  control: any;
  setValue?: any;
  defaultValues: string[];
  options: string[];
  dense?: boolean;
};

function FormMultiCheckBox({
  name,
  control,
  setValue,
  defaultValues,
  options,
  dense,
}: Props) {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultValues);

  function handleSelect(value: any) {
    const isPresent = selectedOptions.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedOptions.filter((item: any) => item !== value);
      setSelectedOptions(remaining);
    } else {
      setSelectedOptions((previousItems) => [...previousItems, value]);
    }
  }

  useEffect(() => {
    setValue(name, defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    setValue(name, selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      {options.map((option) => {
        return (
          <Box key={option}>
            <Controller
              name={name}
              render={({}) => {
                return (
                  <ListItem dense={dense}>
                    <FormControlLabel
                      label={CapitalizeFullName(option)}
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleSelect(option)}
                        />
                      }
                    />
                  </ListItem>
                );
              }}
              control={control}
            />
          </Box>
        );
      })}
    </>
  );
}

export { FormMultiCheckBox };
