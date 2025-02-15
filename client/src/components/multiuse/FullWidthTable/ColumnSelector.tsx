import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TColumnForm, ZColumnForm } from "../../../types/customers";
import { Button } from "../Button";
import { useAuth } from "../../../contexts/AuthContext";
import { syncUserPreference } from "../../../services/userPreferencesServices";
import { TColumn } from "../../columns";
import { ColumnPreferences } from "../../../types/userPreferences";

type props = {
  colOptions: string[];
  colPreferences: ColumnPreferences[];
  title: string;
  columns: TColumn[];
};

function ColumnSelector({ colOptions, colPreferences, title, columns }: props) {
  const [isActive, setActive] = useState(false);
  const { user, updateUserPreferences } = useAuth();

  async function onSubmit(data: { selections: string[] }) {
    setActive(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      <div
        className={isActive ? "ham-menu columns active" : "ham-menu columns"}
        onClick={() => setActive(!isActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={
          isActive ? "column-options-list active" : "column-options-list"
        }
      >
        {errors.selections && (
          <>
            <p>An error occured with your selections, please try again.</p>
          </>
        )}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="column-form"
            className="column-form"
          >
            <h3>Columns</h3>
            <ul>
              {colOptions.map((col, index) => {
                return (
                  <div className="list-item-container" key={col}>
                    <label>{col}</label>
                    <input
                      {...register("selections")}
                      value={col}
                      type="checkbox"
                    />
                  </div>
                );
              })}
            </ul>
          </form>
          <div className="controls">
            <Button
              form={"column-form"}
              disabled={isSubmitting}
              type="submit"
              text={"Save"}
            />
            <Button text={"Cancel"} onClick={() => setActive(!isActive)} />
          </div>
        </div>
      </div>
    </>
  );
}

export { ColumnSelector };
