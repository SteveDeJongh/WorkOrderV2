import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

function CustomerForm({ customer, headerText, onSubmit, buttonText }) {
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
      <div id="customer-header">
        <div id="customer-header-title">
          <h2>{headerText}</h2>
          <div className="customer-form-actions">
            <button>
              {customer && (
                <Link to={`/customers/${customer.id}/profile`}>Cancel</Link>
              )}
              {!customer && <Link to={`/customers`}>Cancel</Link>}
            </button>
            <button form="customer-form" disabled={isSubmitting} type="submit">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <form id="customer-form" onSubmit={handleSubmit(onSubmitHandler)}>
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
        <br />
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
        <br />
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
        <br />
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
        <br />
        <label htmlFor="address">Address:</label>
        <input
          {...register("address")}
          type="string"
          id="address"
          name="address"
          placeholder="123 Donald Ave"
        />
        {errors.address && <p>{`${errors.address.message}`}</p>}
        <br />
        <label htmlFor="city">City:</label>
        <input
          {...register("city")}
          type="string"
          id="city"
          name="city"
          placeholder="Vancouver"
        />
        {errors.city && <p>{`${errors.city.message}`}</p>}
        <br />
        <label htmlFor="province">Province:</label>
        <input
          {...register("province")}
          type="string"
          id="province"
          name="province"
          placeholder="BC"
        />
        {errors.province && <p>{`${errors.province.message}`}</p>}
        <br />
        <label htmlFor="country">Country:</label>
        <input
          {...register("country")}
          type="string"
          id="country"
          name="country"
          placeholder="Canada"
        />
        {errors.country && <p>{`${errors.country.message}`}</p>}
        <br />
      </form>
    </>
  );
}

export default CustomerForm;
