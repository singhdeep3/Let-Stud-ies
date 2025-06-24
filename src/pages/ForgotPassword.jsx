import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getPasswordResetToken } from "../services/operations/authAPI";
import {getPasswordResetToken} from "../services/operations/authAPI";
const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))

    }
    return (
        <div className="text-black font-bold flex justify-center items-center ">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{!emailSent ? "Reset your Password." : "Check your Email."}</h1>
                    <p>
                        {!emailSent
                            ? "Kindly check your emails. We sent you a password reset link."
                            : `We sent you an email at ${email}`}
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label>
                                <p>Email Address: </p>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address."
                                />
                            </label>
                        )}

                        <button>{!emailSent ? "Reset Password" : "Resend Email"}</button>
                    </form>
                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
