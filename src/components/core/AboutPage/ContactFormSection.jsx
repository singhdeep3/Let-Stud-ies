import React from "react"
import ContactUsForm from "../../ContactPage/ContactUsForm";
const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Stay Connected</h1>
      <p className="text-center text-black mt-3">Don't hesitate, just write your suggestions!</p> 
      <div className="mt-12 mx-auto">
        <ContactUsForm/>
      </div>
    </div>
  )
};

export default ContactFormSection;
