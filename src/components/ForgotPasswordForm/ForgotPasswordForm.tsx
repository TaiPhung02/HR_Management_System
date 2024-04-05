import React, { useState } from "react";
import { useFormik } from "formik";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { forgotPasswordValidation } from "../../utils/validate-utils";

import LogoIMG from "../../assets/images/logo-login.png";
import "./forgotPasswordForm.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPGApi } from "../../services/user-services";
import { toast } from "react-toastify";

const initialValues = {
    email: "",
};

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: forgotPasswordValidation,
            onSubmit: async (values) => {
                setIsLoading(true);
                try {
                    await forgotPGApi(values.email);
                    toast.success("Email sent successfully!");
                    navigate("/change-password");
                } catch (error) {
                    console.log("Error sending email: " + error);
                    toast.error("Error sending email: " + error);
                } finally {
                    setIsLoading(false);
                }
            },
        });

    return (
        <>
            <div className="forgot-wrapper">
                <img src={LogoIMG} alt="logo" />
                <h2 className="logo__heading">HR Management System</h2>
                <h2 className="logo__title">Forgot password</h2>

                <form
                    action=""
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="forgot-form"
                >
                    <div className="forgot__input-box">
                        <label htmlFor="username" className="forgot__label">
                            Your work email
                        </label>
                        <input
                            name="email"
                            type="text"
                            className={
                                errors.email && touched.email
                                    ? "forgot__input error"
                                    : "forgot__input"
                            }
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                            <p className="login__message-error">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={
                            isLoading ? "forgot__btn disabled" : "forgot__btn"
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Spin
                                indicator={
                                    <LoadingOutlined
                                        style={{ fontSize: 24 }}
                                        spin
                                    />
                                }
                            />
                        ) : (
                            "Confirm & Send OTP"
                        )}
                    </button>

                    <Link to={"/login"} className="forgot__forgot">
                        Back to Sign In
                    </Link>
                </form>

                <p className="forgot__copyright">
                    Copyright © 2022. All Rights Reserved
                </p>
            </div>
        </>
    );
};

export default ForgotPasswordForm;
