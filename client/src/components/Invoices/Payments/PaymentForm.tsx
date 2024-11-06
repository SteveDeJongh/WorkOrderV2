import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../multiuse/Button";
import { Payment } from "../../../types/invoiceTypes";

type Props = {
  handleCancel: Function;
  payment: Payment;
  onSubmit: Function;
  buttonText: string;
  invoice_id: Number;
};

function PaymentForm({
  handleCancel,
  payment,
  onSubmit,
  buttonText,
  invoice_id,
}: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  async function onSubmitHandler(data) {
    console.log("In the onsbumithandler in Payment Form, data is: ", data);
    try {
      onSubmit(data);
    } catch (e) {
      console.log("failed!", e);
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
                />
                {errors.amount && (
                  <p className="error">{`${errors.amount.message}`}</p>
                )}
              </div>
            </div>
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
