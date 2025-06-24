import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify Your Email</h1>
          <p>Enter the code that has been sent to you on your email.</p>
          <form onSubmit={onSubmitHandler}>
            <OTPInput
              value={otp}
              onChange={
                setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} className="bg-black text-white" />}
            />
            <button type="submit">Verify Email</button>
          </form>
          <div>
            <div>
              <Link to="/login">
                <p>Back to Login</p>
              </Link>
            </div>
            <button
              onClick={() => {
                dispatch(sendOtp(signupData.email, navigate));
              }}
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
