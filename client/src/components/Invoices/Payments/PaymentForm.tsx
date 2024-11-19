import { useForm } from "react-hook-form";
import Button from "../../../multiuse/Button";
import { Payment } from "../../../types/invoiceTypes";
import { useEffect, useState } from "react";

type Props = {
  handleCancel: Function;
  payment?: Payment;
  onSubmit: Function;
  buttonText: string;
  invoice_id: Number;
  balance: number;
};

function PaymentForm({
  handleCancel,
  payment,
  onSubmit,
  buttonText,
  invoice_id,
  balance,
}: Props) {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: payment
      ? {
          id: payment.id,
          invoice_id: payment.invoice_id,
          method: payment.method,
          amount: payment.amount,
        }
      : {
          id: undefined,
          invoice_id: invoice_id,
          method: undefined,
          amount: undefined,
        },
  });

  const watchAmount = watch("amount");
  const watchMethod = watch("method");
  const [change, setChange] = useState(0);
  const [showChange, setShowChange] = useState(
    payment?.method == "Cash" ? true : payment ? false : true
  );

  useEffect(() => {
    if (watchMethod === "Cash") {
      if (watchAmount && watchAmount < 0) {
        setChange(0);
      } else {
        setChange(Number(watchAmount) - balance);
      }
      setShowChange(true);
    } else {
      setChange(0);
      setShowChange(false);
    }
  }, [watchMethod, watchAmount]);

  async function onSubmitHandler(data: Payment) {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Failed to submit payment", e);
    }
  }

  return (
    <>
      <form
        id="main-modal-form"
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input {...register("id")} type="hidden" id="id" name="id" />
        <input
          {...register("invoice_id")}
          type="hidden"
          id="invoice_id"
          name="invoice_id"
        />

        <div className="panel">
          <h3>Details</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="method">Method:</label>
                <select
                  {...register("method", {
                    required: "Product Name is required.",
                  })}
                  id="method"
                  name="method"
                >
                  <option value="Cash">Cash</option>
                  <option value="Visa">Visa</option>
                  <option value="Debit">Debit</option>
                </select>
                {errors.method && (
                  <p className="error">{`${errors.method.message}`}</p>
                )}
              </div>
            </div>
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="amount">Amount:</label>
                <input
                  {...register("amount", {
                    required: "amount is required.",
                  })}
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="amount"
                  defaultValue={balance}
                />
                {errors.amount && (
                  <p className="error">{`${errors.amount.message}`}</p>
                )}
              </div>
            </div>
            {showChange && (
              <div className="panel-contents-section">
                <div className="formPair">
                  <label htmlFor="amount">Change Due:</label>
                  <input
                    {...register("change")}
                    type="text"
                    id="change"
                    name="change"
                    disabled={true}
                    value={change}
                  />
                  {errors.amount && (
                    <p className="error">{`${errors.amount.message}`}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="main-modal-form-actions">
        <div className="main-pane-form-actions">
          <Button onClick={() => handleCancel()} text={"Cancel"} />
          <Button
            form={"main-modal-form"}
            disabled={isSubmitting}
            type={"submit"}
            text={buttonText}
          />
        </div>
      </div>
    </>
  );
}

export default PaymentForm;
