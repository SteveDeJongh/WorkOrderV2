import { useEffect, useState } from "react";
import { RoleTypes } from "../../types/users";
import { Controller } from "react-hook-form";
import { Box, Checkbox } from "@mui/material";
import { CapitalizeFullName } from "../../utils";

const roleOptions: RoleTypes[] = ["user", "manager", "admin"];

type Props = {
  name: string;
  control: any;
  setValue?: any;
  defaultValues: RoleTypes[];
};

function FormMultiCheckBox({ name, control, setValue, defaultValues }: Props) {
  const [selectedRoles, setSelectedRoles] =
    useState<RoleTypes[]>(defaultValues);

  function handleSelect(value: any) {
    const isPresent = selectedRoles.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedRoles.filter((item: any) => item !== value);
      setSelectedRoles(remaining);
    } else {
      setSelectedRoles((previousItems) => [...previousItems, value]);
    }
  }

  useEffect(() => {
    setValue(name, defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    setValue(name, selectedRoles);
  }, [selectedRoles]);

  return (
    <>
      {roleOptions.map((option) => {
        return (
          <Box key={option}>
            <Controller
              name={name}
              render={({}) => {
                return (
                  <Checkbox
                    checked={selectedRoles.includes(option)}
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
