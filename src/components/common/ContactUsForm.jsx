import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../services/apiConnector";
import {contactusEndpoint} from "../../services/api";
import countrycode from "../../data/countrycode.json";
const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter First Name"
            className="text-black"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && <span>Please Enter Your First Name</span>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter Last Name"
            {...register("lastname")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="text-black"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please Enter Your Email Address</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="phonenumber">Phone Number</label>
          <div className="flex gap-6">
            <div className="flex w-[80px] gap-3">
              <select
                name="dropdown"
                id="phonenumber"
                {...register("countrycode", { required: true })}
              >
                {countrycode.map((e, idx) => {
                  return (
                    <option key={idx} value={e.code}>
                      {e.code} - {e.Country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex w-[calc(100%-90px)] flex-col">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="86948 - 83918"
                className="text-black"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please Enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={7}
            placeholder="Enter Your Message :-)"
            className="text-black"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please Enter Your Message.</span>}
        </div>

        <button
          type="submit"
          className="rounded-md bg-amber-600 text-center px-6 text-[17px] font-bold text-black"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
