import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiConnector from "../../services/apiConnector"
import contactusEndpoint from "../../services/api"
const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => { 
        try{

            setLoading(true);
            const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)

        }catch(error){

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
            <div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
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

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>Please Enter Your Email Address</span>}
                </div>

                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        cols={30}
                        rows={7}
                        placeholder="Enter Your Message :-)"
                        {...register("message", { required: true })}
                    />
                    {errors.message && <span>Please Enter Your Message.</span>}
                </div>

                <button type="submit" className="rounded-md bg-amber-600 text-center px-6 text-[17px] font-bold text-black">
                    Send Message
                </button>



            </div>
        </form>
    );
};

export default ContactUsForm;
