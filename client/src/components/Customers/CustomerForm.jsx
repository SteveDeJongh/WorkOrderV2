import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

function CustomerForm({ customer, headerText, onSubmit, buttonText }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    defaultValues: customer
      ? {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          province: customer.province,
          country: customer.country,
        }
      : undefined,
  });

  // const [selection, setSelection] = useOutletContext();

  async function onSubmitHandler(data) {
    console.log(data);
    try {
      onSubmit(data);
    } catch (e) {
      console.log("failed!");
    }
  }

  return (
    <>
      <div className="main-pane-header">
        <div className="main-pane-header-title">
          <h2>{headerText}</h2>
          <div className="main-pane-form-actions">
            <button type="button" onClick={() => navigate(-1)}>
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
      <form
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="panel">
          <h3>Customer Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="firstName">First name:</label>
              <input
                {...register("firstName", {
                  required: "First Name is required.",
                })}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />
              {errors.firstName && <p>{`${errors.firstName.message}`}</p>}
            </div>
            <div className="formPair half">
              <label htmlFor="lastName">Last name:</label>
              <input
                {...register("lastName", {
                  required: "Last Name is required.",
                })}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
              {errors.lastName && <p>{`${errors.lastName.message}`}</p>}
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
    </>
  );
}

export default CustomerForm;
