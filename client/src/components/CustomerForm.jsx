import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newCustomerSchema = z.object({
  firstName: z.string().min(2, "name must be at least 2 characters long."),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
});

function CustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(newCustomerSchema),
  });

  async function onSubmit(data) {
    // Todo, send info to server.
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First name:</label>
        <input
          {...register("firstName")}
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
        />
        {errors.firstName && <p>{`${errors.firstName.message}`}</p>}
        <br />
        <label htmlFor="lastName">Last name:</label>
        <input
          {...register("lastName")}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
        />
        {errors.lastName && <p>{`${errors.lastName.message}`}</p>}
        <br />
        <label htmlFor="Email">Email:</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          placeholder="test@case.com"
        />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <br />
        <label htmlFor="phone">Phone Number:</label>
        <input
          {...register("phone")}
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
