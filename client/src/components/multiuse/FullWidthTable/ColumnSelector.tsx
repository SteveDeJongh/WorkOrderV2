import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TColumnForm, ZColumnForm } from "../../../types/customers";
import { useAuth } from "../../../contexts/AuthContext";
import { syncUserPreference } from "../../../services/userPreferencesServices";
import { TColumn } from "../../columns";
import { ColumnPreferences } from "../../../types/userPreferences";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  ClickAwayListener,
  IconButton,
  List,
  Popper,
  Typography,
} from "@mui/material";
import { MenuIcon, MenuOpenIcon } from "../../../utils/muiImports";
import { FormMultiCheckBox } from "../../FormParts/FormMultiCheckBox";

type props = {
  colOptions: string[];
  colPreferences: ColumnPreferences[];
  title: string;
  columns: TColumn[];
};

function ColumnSelector({ colOptions, colPreferences, title, columns }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const { user, updateUserPreferences } = useAuth();

  async function onSubmit(data: { selections: string[] }) {
    setIsOpen(false);

    let newColPreferences: ColumnPreferences[] = colPreferences.map(
      (colPref) => {
        const isSelected = data.selections.findIndex(
          (selection) => selection === colPref.id
        );

        return isSelected >= 0
          ? { ...colPref, display: true }
          : { ...colPref, display: false };
      }
    );

    const keyName = `${title.toLowerCase().slice(0, -1)}_columns`;
    const updatedPreferences = await syncUserPreference(user!.id, {
      [keyName]: JSON.stringify(newColPreferences),
    });

    updateUserPreferences(updatedPreferences);
  }

  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    if (colPreferences) {
      setSelected(colPreferences.map((pref) => (pref.display ? pref.id : "")));
    }
  }, [colPreferences]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TColumnForm>({
    defaultValues: {
      selections: colPreferences
        .filter((colPref) => colPref.display)
        .map((pref) => pref.id),
    },
    resolver: zodResolver(ZColumnForm),
  });

  return (
    <>
      <Box
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setIsOpen(!isOpen);
        }}
        sx={{ marginLeft: "auto" }}
      >
        {!isOpen && (
          <IconButton>
            <MenuIcon />
          </IconButton>
        )}
        {isOpen && (
          <IconButton>
            <MenuOpenIcon />
          </IconButton>
        )}
      </Box>
      {isOpen && (
        <Box>
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Popper open={isOpen} anchorEl={anchorEl}>
              <Card sx={{ padding: 1 }}>
                {errors.selections && (
                  <Alert color="error">
                    An error occured with your selections, please try again.
                  </Alert>
                )}
                <Box
                  onSubmit={handleSubmit(onSubmit)}
                  id="column-form"
                  className="column-form"
                  component={"form"}
                >
                  <Typography variant="h6">Columns</Typography>
                  <List>
                    <FormMultiCheckBox
                      name="selections"
                      control={control}
                      setValue={setValue}
                      defaultValues={selected}
                      options={colOptions}
                      dense={true}
                    />
                  </List>
                </Box>
                <CardActions>
                  <Button
                    form={"column-form"}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
                </CardActions>
              </Card>
            </Popper>
          </ClickAwayListener>
        </Box>
      )}
    </>
  );
}

export { ColumnSelector };
