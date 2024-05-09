import { useForm } from "react-hook-form";
import { createCustomer } from "../services/customerServices";
import { objectToFormData } from "../utils/formDataHelper";

function CustomerForm({ showForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  async function onSubmit(rawData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      const response = await createCustomer(formData);
      reset();
      showForm(false);
    } catch (e) {
      console.error("Failed to create customer: ", e);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button disabled={isSubmitting} type="submit">
          Create
        </button>
        {/* <button type="cancel">Cancel</button> */}
      </form>
    </>
  );
}

export default CustomerForm;
