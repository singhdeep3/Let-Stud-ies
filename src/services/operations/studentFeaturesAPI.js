import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import companyLogo from "../../assets/Logo/company_logo.jpeg";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
// require("dotenv").config();
const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("loading");
  console.log("Inside of buyCourse")
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay failed to load...");
      return;
    }
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("orderResponse is ",orderResponse)
    if (!orderResponse.data.success)
      throw new Error(orderResponse.data.message);

    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data?.data?.currency,
      amount: `${orderResponse?.data?.data?.amount}`,
      order_id: orderResponse?.data?.data?.id,
      name: "Pheonix",
      description: "Thank You for buying...",
      image: companyLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse?.data?.data?.amount,
          token
        );
        console.log("Response is ",response)
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed",function(response){
      toast.error("OOPS payment failed...")
      console.log(response)
    })
  } catch (error) {
    console.log("Payment Errror", error);
    toast.error("Could not make Payment!");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    console.log("Inside studentFeatureApi")
    console.log(response)
  console.log(response.razorpay_payment_id)
  console.log(amount)
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("Payment Successfull Email Error", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) throw new Error(response.data.message);

    toast.success("Payment Successfull, course is all yours");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("Payment verify error...", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
