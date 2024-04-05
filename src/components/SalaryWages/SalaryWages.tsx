import React from "react";
import { useFormik } from "formik";
import "./salaryWages.css";
import { salaryWagesValidation } from "../../utils/validate-utils";

const initialValues = {
    basic_salary: "",
    basic_salary_audit: "",
    safety_insurance_amount: "",
    health_insurance_amount: "",
    meal_allowance: "",
};
const SalaryWages = () => {
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: salaryWagesValidation,
            onSubmit: (values) => {
                console.log(values);
            },
        });

    return (
        <div className="addnew-container">
            <div className="addnew__header">
                <h2 className="addnew__header-heading">Salary & Wages</h2>
            </div>
            <div className="addnew__header-line"></div>
            <div className="addnew__salary">
                <form action="" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="basic_salary"
                            className="addnew__salary-label"
                        >
                            Basic Salary<span className="required">*</span>
                        </label>
                        <div>
                            <div className="addnew__salary-number-box">
                                <span className="addnew__salary-number-desc">
                                    RP
                                </span>
                                <input
                                    id="basic_salary"
                                    type="number"
                                    className={
                                        errors.basic_salary &&
                                        touched.basic_salary
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.basic_salary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.basic_salary && errors.basic_salary && (
                                <p className="login__message-error">
                                    {errors.basic_salary}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="basic_salary_audit"
                            className="addnew__salary-label"
                        >
                            Basic Salary (Audit)
                            <span className="required">*</span>
                        </label>
                        <div>
                            <div className="addnew__salary-number-box">
                                <span className="addnew__salary-number-desc">
                                    RP
                                </span>
                                <input
                                    type="number"
                                    id="basic_salary_audit"
                                    className={
                                        errors.basic_salary_audit &&
                                        touched.basic_salary_audit
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.basic_salary_audit}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.basic_salary_audit &&
                                errors.basic_salary_audit && (
                                    <p className="login__message-error">
                                        {errors.basic_salary_audit}
                                    </p>
                                )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="safety_insurance_amount"
                            className="addnew__salary-label"
                        >
                            Safety Insurance Amount
                            <span className="required">*</span>
                        </label>
                        <div>
                            <div className="addnew__salary-number-box">
                                <span className="addnew__salary-number-desc">
                                    RP
                                </span>
                                <input
                                    type="number"
                                    id="safety_insurance_amount"
                                    className={
                                        errors.safety_insurance_amount &&
                                        touched.safety_insurance_amount
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.safety_insurance_amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.safety_insurance_amount &&
                                errors.safety_insurance_amount && (
                                    <p className="login__message-error">
                                        {errors.safety_insurance_amount}
                                    </p>
                                )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="health_insurance_amount"
                            className="addnew__salary-label"
                        >
                            Health Insurance Amount
                            <span className="required">*</span>
                        </label>
                        <div>
                            <div className="addnew__salary-number-box">
                                <span className="addnew__salary-number-desc">
                                    RP
                                </span>
                                <input
                                    type="number"
                                    id="health_insurance_amount"
                                    className={
                                        errors.health_insurance_amount &&
                                        touched.health_insurance_amount
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.health_insurance_amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.health_insurance_amount &&
                                errors.health_insurance_amount && (
                                    <p className="login__message-error">
                                        {errors.health_insurance_amount}
                                    </p>
                                )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="meal_allowance"
                            className="addnew__salary-label"
                        >
                            Meal Allowance<span className="required">*</span>
                        </label>
                        <div>
                            <div className="addnew__salary-number-box">
                                <span className="addnew__salary-number-desc">
                                    RP
                                </span>
                                <input
                                    type="number"
                                    id="meal_allowance"
                                    className={
                                        errors.meal_allowance &&
                                        touched.meal_allowance
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.meal_allowance}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.meal_allowance &&
                                errors.meal_allowance && (
                                    <p className="login__message-error">
                                        {errors.meal_allowance}
                                    </p>
                                )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SalaryWages;
