import { Controller, useForm } from "react-hook-form";
import { EditablePaymentData, Payment } from "../../../types/payments";
import { useEffect, useState } from "react";
import { showAsDollarAmount } from "../../../utils/index";
import {
  Box,
  Button,
  CardActions,
  Chip,
  FormLabel,
  Grid2,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FormSelectInput } from "../../FormParts/FormSelectInput";
import { FormNumberInput } from "../../FormParts/FormNumberInput";

type Props = {
  handleCancel: () => void;
  onSubmit: (data: EditablePaymentData) => void;
  payment?: Payment;
  buttonText: string;
  invoice_id: number | null;
  balance: number;
};

const PAYMENT_METHODS = [
  { value: "Cash", label: "Cash" },
  { value: "Visa", label: "Visa" },
  { value: "Debit", label: "Debit" },
];

function PaymentForm({
  handleCancel,
  payment,
  onSubmit,
  buttonText,
  invoice_id,
  balance,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm({
    defaultValues: payment
      ? {
          id: payment.id,
          created_at: payment.created_at,
          invoice_id: payment.invoice_id,
          method: payment.method,
          amount: payment.amount,
          change: payment.change,
        }
      : {
          created_at: "",
          invoice_id: invoice_id ? invoice_id : 0,
          method: "Cash",
          amount: balance,
          change: 0,
        },
  });

  const watchAmount = watch("amount");
  const watchMethod = watch("method");
  const [change, setChange] = useState(0);
  const [showChange, setShowChange] = useState(
    payment?.method == "Cash" ? true : payment ? false : true
  );

  useEffect(() => {
    setValue("change", change);
  }, [change, setValue]);

  useEffect(() => {
    const existing = payment ? Number(payment.amount) : 0;
    const rawChange = Number(watchAmount) - balance - existing;

    setChange(watchAmount && rawChange > 0 ? rawChange : 0);
    setShowChange(watchMethod === "Cash");
  }, [watchMethod, watchAmount, balance, payment]);

  async function onSubmitHandler(data: EditablePaymentData) {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Failed to submit payment", e);
    }
  }

  return (
    <>
      <Box
        id="main-modal-form"
        component={"form"}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* <Controller
          name={"id"}
          control={control}
          render={() => <input type="hidden" id="id" name="id" />}
        />
        <Controller
          name={"created_at"}
          control={control}
          render={() => (
            <input type="hidden" id="created_at" name="created_at" />
          )}
        />
        <Controller
          name={"invoice_id"}
          control={control}
          render={() => (
            <input type="hidden" id="invoice_id" name="invoice_id" />
          )}
        /> */}
        <Typography variant="h6">Details</Typography>
        <Grid2 container>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormSelectInput
              id="method"
              name="method"
              control={control}
              title={"Method"}
              defaultValue={"Cash"}
            >
              {PAYMENT_METHODS.map((opt) => {
                return (
                  <MenuItem
                    key={`payment_method_${opt.value}`}
                    value={opt.value}
                  >
                    {opt.label}
                  </MenuItem>
                );
              })}
            </FormSelectInput>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="amount"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormNumberInput
                  id="amount"
                  name="amount"
                  title="Amount"
                  placeholder={payment ? payment.amount : 0}
                  onChange={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
          </Grid2>
          {showChange && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="change"
                control={control}
                render={({ field: { value } }) => (
                  <Stack direction="row" alignItems={"center"}>
                    <FormLabel
                      style={{ fontWeight: "bold" }}
                      htmlFor={"change"}
                    >
                      Change
                    </FormLabel>
                    <Chip
                      color={
                        value
                          ? Number(value) > 0
                            ? "success"
                            : "error"
                          : "default"
                      }
                      label={showAsDollarAmount(value!)}
                    />
                  </Stack>
                )}
              />
            </Grid2>
          )}
        </Grid2>
      </Box>
      <Box>
        <CardActions>
          <Button
            variant="contained"
            form={"main-modal-form"}
            disabled={isSubmitting}
            type={"submit"}
          >
            {buttonText}
          </Button>
          <Button variant="outlined" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </CardActions>
      </Box>
    </>
  );
}

export { PaymentForm };
