import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TColumnForm, ZColumnForm } from "../../types/customers";
import { Button } from "../multiuse/Button";
import { useAuth } from "../../contexts/AuthContext";
import { syncUserPreference } from "../../services/userPreferencesServices";
type props = {
  colOptions: string[];
  preferences: string[];
  table: string;
};

function ColumnSelector({ colOptions, preferences, table }: props) {
  const [isActive, setActive] = useState(false);
  const { user, updateUserPreferences } = useAuth();

  async function onSubmit(data: { selections: string[] }) {
    setActive(false);
    const keyName = `${table.slice(0, -1)}_columns`;
    const updatedPreferences = await syncUserPreference(user!.id, {
      [keyName]: data.selections.join(", "),
    });

    updateUserPreferences(updatedPreferences);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TColumnForm>({
    defaultValues: { selections: [...preferences] },
    resolver: zodResolver(ZColumnForm),
  });

  return (
    <>
      <div
        className={isActive ? "ham-menu active" : "ham-menu"}
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
