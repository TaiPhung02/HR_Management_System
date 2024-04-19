import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { loginValidation } from "../../utils/validate-utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    loginFail,
    loginStart,
    loginSuccess,
    logout,
} from "../../redux/auth/authSlice";
import { companyApi, loginPGApi } from "../../services/user-services";
import { ICompany } from "../../interfaces/company-interface";

import { toast } from "react-toastify";
import LogoIMG from "../../assets/images/logo-login.png";
import "./loginForm.css";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

const initialValues = {
    username: "",
    password: "",
    factory: "",
};

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [companies, setCompanies] = useState<ICompany[]>([]);

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: loginValidation,
            onSubmit: async (values) => {
                setIsLoading(true);
                dispatch(loginStart());

                try {
                    const res = await loginPGApi(
                        values.username,
                        values.password,
                        values.factory
                    );
                    if (res && res.data && res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        dispatch(loginSuccess(res.data));
                        toast.success("Logged in successfully");
                        navigate("/");

                        // auto logout
                        setTimeout(() => {
                            dispatch(logout());
                            localStorage.removeItem("token");
                            toast.info(
                                "You have been automatically logged out due to inactivity."
                            );
                            navigate("/login");
                        }, 180000);
                    } else {
                        dispatch(
                            loginFail(
                                "Incorrect Username, Password or Factory. Please try again!"
                            )
                        );
                        toast.error(
                            "Incorrect Username, Password or Factory. Please try again!"
                        );
                    }
                } catch (error) {
                    toast.error("An error occurred during login: " + error);
                    dispatch(
                        loginFail(
                            "Incorrect Username, Password or Factory. Please try again!"
                        )
                    );
                } finally {
                    setIsLoading(false);
                }
            },
        });

    const fetchCompany = async () => {
        try {
            const companiesRes = await companyApi();
            if (companiesRes && companiesRes.data) {
                setCompanies(companiesRes.data);
            } else {
                console.error("No data returned from company API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    return (
        <>
            <div className="login-wrapper">
                <img src={LogoIMG} alt="logo" />
                <h2 className="logo__heading">HR Management System</h2>
                <h2 className="logo__title">Sign In</h2>

                <form
                    action=""
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <div className="login__input-box">
                        <label htmlFor="username" className="login__label">
                            Username:
                        </label>
                        <input
                            name="username"
                            type="text"
                            className={
                                errors.username && touched.username
                                    ? "login__input error"
                                    : "login__input"
                            }
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.username && errors.username && (
                            <p className="login__message-error">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div className="login__input-box">
                        <label htmlFor="password" className="login__label">
                            Password:
                        </label>
                        <div className="login__input-password">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="on"
                                className={
                                    errors.password && touched.password
                                        ? "login__input error"
                                        : "login__input"
                                }
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span
                                className={
                                    values.password
                                        ? "toggle-password"
                                        : "toggle-password disable"
                                }
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )}
                            </span>
                        </div>
                        {touched.password && errors.password && (
                            <p className="login__message-error">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="login__input-box">
                        <label htmlFor="factory" className="login__label">
                            Factory:
                        </label>
                        <select
                            name="factory"
                            className={
                                errors.factory && touched.factory
                                    ? "login__input error"
                                    : "login__input"
                            }
                            value={values.factory}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="" disabled hidden>
                                -- Select Factory --
                            </option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        {touched.factory && errors.factory && (
                            <p className="login__message-error">
                                {errors.factory}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={
                            isLoading ? "login__btn disabled" : "login__btn"
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
                            "Submit"
                        )}
                    </button>

                    <Link to={"/forgot-password"} className="login__forgot">
                        Forgot Your Password?
                    </Link>
                </form>

                <p className="login__copyright">
                    Copyright © 2022. All Rights Reserved
                </p>
            </div>
        </>
    );
};

export default LoginForm;
