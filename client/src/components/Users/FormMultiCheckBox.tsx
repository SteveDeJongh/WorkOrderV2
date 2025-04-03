import { useEffect, useState } from "react";
import { RoleTypes } from "../../types/users";
import { Controller } from "react-hook-form";
import { Box, Checkbox } from "../../utils/muiImports";
import { CapitalizeFullName } from "../../utils";

const roleOptions: RoleTypes[] = ["user", "manager", "admin"];

type Props = {
  name: string;
  control: any;
  setValue?: any;
  defaultValues: string[];
  options: string[];
};

function FormMultiCheckBox({
  name,
  control,
  setValue,
  defaultValues,
  options,
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

  const mapArray = options ? options : roleOptions;
  return (
    <>
      {mapArray.map((option) => {
        return (
          <Box key={option}>
            <Controller
              name={name}
              render={({}) => {
                return (
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleSelect(option)}
                  />
                );
              }}
              control={control}
            />
            <label style={{ fontWeight: "normal" }} htmlFor={option}>
              {CapitalizeFullName(option)}
            </label>
          </Box>
        );
      })}
    </>
  );
}

export { FormMultiCheckBox };
