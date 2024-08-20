import { useForm } from "react-hook-form";

type props = {
  modalForm: boolean;
  handleCancel: Function;
  data: invoice;
  headerText: string;
  onSubmit: Function;
  buttonText: string;
};

type invoice = {
  id: Number;
};

function InvoiceForm({
  modalForm,
  handleCancel,
  data,
  headerText,
  onSubmit,
  buttonText,
}: props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: data
      ? {
          id: data.id,
        }
      : undefined,
  });

  async function onSubmitHandler(data) {
    try {
      onSubmit(data);
    } catch (e) {
      console.log("failed!");
    }
  }

  return (
    <>
      {!modalForm && (
        <div className="main-pane-header">
          <div className="main-pane-header-title">
            <h2>{headerText}</h2>
            <div className="main-pane-form-actions">
              <button type="button" onClick={() => handleCancel()}>
                Cancel
              </button>
              <button
                form="main-pane-content"
                disabled={isSubmitting}
                type="submit"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
      <form
        id="main-pane-content"
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="panel">
          <h3>Invoice Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="id">ID:</label>
              <input
                {...register("id", {
                  required: "First Name is required.",
                })}
                type="text"
                id="id"
                name="id"
                placeholder="First Name"
              />
              {errors.id && <p>{`${errors.id.message}`}</p>}
            </div>
          </div>
        </div>
      </form>
      {modalForm && (
        <div className="main-modal-form-actions">
          <div className="main-pane-form-actions">
            <button type="button" onClick={() => handleCancel()}>
              Cancel
            </button>
            <button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceForm;
