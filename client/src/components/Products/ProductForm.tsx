import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditableProductData, Product } from "../../types/products";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  FormGroup,
  Grid2,
  Typography,
} from "../../utils/muiImports";
import { FormTextInput } from "../FormParts/FormTextInput";
import { FormMultiCheckBox } from "../Users/FormMultiCheckBox";

type Props = {
  modalForm?: boolean;
  product?: Product;
  headerText: string;
  onSubmit: UseMutateFunction<Product, Error, EditableProductData, unknown>;
  buttonText: string;
  onCancel: React.Dispatch<React.SetStateAction<number>>;
};

function ProductForm({
  modalForm,
  product,
  headerText,
  onSubmit,
  buttonText,
  onCancel,
}: Props) {
  const navigate = useNavigate();
  const [inventoried, setInventoried] = useState<boolean>(
    product ? product.inventory : true
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          sku: product.sku,
          upc: product.upc,
          price: product.price,
          cost: product.cost,
          stock: product.stock,
          min: product.min,
          max: product.max,
          inventory: product.inventory,
          tax_rate_id: product.tax_rate_id,
        }
      : undefined,
  });

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
                    <FormTextInput
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
            <h3>Pricing</h3>
            <Grid2 container direction="row" spacing={2}>
              <div className="formPair half">
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
              </div>
              <div className="formPair half">
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
              </div>
            </Grid2>
            <Grid2 container direction="row" spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                {/* <Controller
                    id="tax_rate_id"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      // This should be a select input
                      <FormTextInput
                        id="tax_rate_id"
                        name="tax_rate_id"
                        title="Tax Rate"
                        placeholder="1"
                        onChange={onChange}
                        value={value}
                        error={error}
                      />
                    )}
                  /> */}
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2>
            <h3>Inventory Options</h3>
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
                      <FormTextInput
                        id="stock"
                        name="stock"
                        title="Stock"
                        placeholder="1"
                        onChange={onChange}
                        value={value}
                        error={error}
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
                      <FormTextInput
                        id="min"
                        name="min"
                        title="Min"
                        placeholder="1"
                        onChange={onChange}
                        value={value}
                        error={error}
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
                      <FormTextInput
                        id="max"
                        name="max"
                        title="Max"
                        placeholder="100"
                        onChange={onChange}
                        value={value}
                        error={error}
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
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
