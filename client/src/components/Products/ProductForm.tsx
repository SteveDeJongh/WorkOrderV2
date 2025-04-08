import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditableProductData, Product } from "../../types/products";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  FormGroup,
  Grid2,
  MenuItem,
  Typography,
} from "../../utils/muiImports";
import { FormTextInput } from "../FormParts/FormTextInput";
import { FormMultiCheckBox } from "../Users/FormMultiCheckBox";
import { FormNumberInput } from "../FormParts/FormNumberInput";
import { FormSelectInput } from "../FormParts/FormSelectInput";

type Props = {
  modalForm?: boolean;
  product?: Product;
  headerText: string;
  onSubmit: UseMutateFunction<Product, Error, EditableProductData, unknown>;
  buttonText: string;
  onCancel: React.Dispatch<React.SetStateAction<number>>;
};

// Hardcoded tax rates for now, to be fetched from API eventually.
const TAX_RATES = [
  { id: 1, percentage: 0.15 },
  { id: 2, percentage: 0.12 },
  { id: 3, percentage: 0.1 },
];

function ProductForm({
  modalForm,
  product,
  headerText,
  onSubmit,
  buttonText,
  onCancel,
}: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          sku: product.sku,
          upc: product.upc,
          price: parseInt(product.price, 10).toFixed(2),
          cost: parseInt(product.cost, 10).toFixed(2),
          stock: product.stock,
          min: product.min,
          max: product.max,
          inventory: product.inventory,
          tax_rate_id: product.tax_rate_id,
        }
      : undefined,
  });

  // const watchInventory = watch("inventory");
  // const [inventoried, setInventoried] = useState<boolean>(product!.inventory);

  // useEffect(() => {
  //   if (watchInventory) {
  //     setInventoried(true);
  //   }
  // }, [watchInventory]);
  const inventoried = true;

  async function onSubmitHandler(data: EditableProductData) {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("failed!");
    }
  }

  return (
    <>
      {/* {!modalForm && (
        <div className="main-pane-header">
          <div className="main-pane-header-title">
            <h2>{headerText}</h2>
            <div className="main-pane-form-actions">
              <Button onClick={() => navigate(-1)} text={"Cancel"} />
              <Button
                form="main-pane-content"
                disabled={isSubmitting}
                type="submit"
                text={buttonText}
              />
            </div>
          </div>
        </div>
      )} */}
      <Box
        component="form"
        id="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid2 container direction="column">
          <Typography variant="h6">{headerText}</Typography>
          <Grid2 className="panel-contents">
            <Grid2 container direction="row" spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"name"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="name"
                      name="name"
                      title="Name"
                      placeholder="Product Name"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="description"
                      name="description"
                      title="Description"
                      placeholder="Description"
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Grid2 container direction="row" spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name="sku"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="sku"
                      name="sku"
                      title="Sku"
                      placeholder="PR0001"
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name="upc"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormNumberInput
                      id="upc"
                      name="upc"
                      title="UPC"
                      placeholder="123123123123"
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2>
            <Typography variant="h6">Pricing</Typography>
            <Grid2 container direction="row" spacing={2}>
              <Grid2 size={{ xs: 4 }}>
                <Controller
                  name="price"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="price"
                      name="price"
                      title="Price"
                      placeholder="9.99"
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Controller
                  name="cost"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="cost"
                      name="cost"
                      title="Cost"
                      placeholder="4.99"
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <FormSelectInput
                  id="tax_rate_id"
                  name="tax_rate_id"
                  control={control}
                  title={"Tax Rate"}
                  defaultValue={product?.tax_rate_id ? product.tax_rate_id : 1}
                >
                  {TAX_RATES.map((opt) => {
                    return (
                      <MenuItem
                        key={`tax_rate_${opt.id}`}
                        value={opt.id}
                        selected={opt.id == product?.tax_rate_id}
                      >
                        {`${opt.percentage * 100}%`}
                      </MenuItem>
                    );
                  })}
                </FormSelectInput>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2>
            <Typography variant="h6">Inventory Options</Typography>
            <Grid2 container direction="row" spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <FormGroup row>
                  <FormMultiCheckBox
                    control={control}
                    name={"inventory"}
                    setValue={setValue}
                    defaultValues={product?.inventory ? ["inventory"] : []}
                    options={["inventory"]}
                  />
                </FormGroup>
              </Grid2>
            </Grid2>
            {inventoried && (
              <Grid2
                id="inventoryDetails"
                style={{ display: inventoried ? "" : "none" }}
              >
                <Grid2 container direction="row" spacing={2}>
                  <Grid2 size={{ xs: 4 }}>
                    <Controller
                      name="stock"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormNumberInput
                          id="stock"
                          name="stock"
                          title="Stock"
                          placeholder="1"
                          onChange={onChange}
                          value={value}
                          error={error}
                          keepSpinner={true}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Controller
                      name="min"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormNumberInput
                          id="min"
                          name="min"
                          title="Min"
                          placeholder="1"
                          onChange={onChange}
                          value={value}
                          error={error}
                          keepSpinner={true}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Controller
                      name="max"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormNumberInput
                          id="max"
                          name="max"
                          title="Max"
                          placeholder="100"
                          onChange={onChange}
                          value={value}
                          error={error}
                          keepSpinner={true}
                        />
                      )}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            )}
          </Grid2>
        </Grid2>
      </Box>
      <Box>
        <CardActions>
          <Button variant="contained" onClick={() => onCancel(0)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            form="main-pane-content"
            disabled={isSubmitting}
            type="submit"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {buttonText}
          </Button>
        </CardActions>
      </Box>
      {/* {modalForm && (
        <div className="main-modal-form-actions">
          <div className="main-pane-form-actions">
            <Button text={"Cancel"} />
            <Button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
              text={buttonText}
            />
          </div>
        </div>
      )} */}
    </>
  );
}

export { ProductForm };
