import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../multiuse/Button";

function CustomerForm({
  modalForm,
  handleCancel,
  customer,
  headerText,
  onSubmit,
  buttonText,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    defaultValues: customer
      ? {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          province: customer.province,
          country: customer.country,
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
              <Button onClick={() => navigate(-1)} text={"Cancel"} />
              <Button
                type={"submit"}
                form={"main-pane-content"}
                text={buttonText}
              />
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
          <h3>Customer Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="first_name">First name:</label>
              <input
                {...register("first_name", {
                  required: "First Name is required.",
                })}
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
              />
              {errors.first_name && <p>{`${errors.first_name.message}`}</p>}
            </div>
            <div className="formPair half">
              <label htmlFor="last_name">Last name:</label>
              <input
                {...register("last_name", {
                  required: "Last Name is required.",
                })}
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
              />
              {errors.last_name && <p>{`${errors.last_name.message}`}</p>}
            </div>
          </div>
        </div>
        <div className="panel">
          <h3>Contact Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="Email">Email:</label>
              <input
                {...register("email", {
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                type="email"
                id="email"
                name="email"
                placeholder="test@case.com"
              />
              {errors.email && <p>{`${errors.email.message}`}</p>}
            </div>
            <div className="formPair half">
              <label htmlFor="phone">Phone Number:</label>
              <input
                {...register("phone", {
                  validate: (value) => {
                    if (value === "" && getValues("email") === "") {
                      return "A contact method is requried, please provide a phone number or email address.";
                    }
                  },
                })}
                type="phone"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
              />
              {errors.phone && <p>{`${errors.phone.message}`}</p>}
            </div>
          </div>
        </div>
        <div className="panel">
          <h3>Address Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="address">Address:</label>
              <input
                {...register("address")}
                type="string"
                id="address"
                name="address"
                placeholder="123 Donald Ave"
              />
              {errors.address && <p>{`${errors.address.message}`}</p>}
            </div>
            <div className="formPair half">
              <label htmlFor="city">City:</label>
              <input
                {...register("city")}
                type="string"
                id="city"
                name="city"
                placeholder="Vancouver"
              />
              {errors.city && <p>{`${errors.city.message}`}</p>}
            </div>
          </div>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="province">Province:</label>
              <input
                {...register("province")}
                type="string"
                id="province"
                name="province"
                placeholder="BC"
              />
              {errors.province && <p>{`${errors.province.message}`}</p>}
            </div>
            <div className="formPair">
              <label htmlFor="country">Country:</label>
              <input
                {...register("country")}
                type="string"
                id="country"
                name="country"
                placeholder="Canada"
              />
              {errors.country && <p>{`${errors.country.message}`}</p>}
            </div>
          </div>
        </div>
      </form>
      {modalForm && (
        <div className="main-modal-form-actions">
          <div className="main-pane-form-actions">
            <Button onClick={() => handleCancel()} text="Cancel" />
            <Button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
              text={buttonText}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerForm;
