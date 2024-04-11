import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./salaryWages.css";
import { salaryWagesValidation } from "../../utils/validate-utils";
import { ISalaryWages } from "../../interfaces/salaryWages-interface";
import { useParams } from "react-router-dom";
import { getEmployeeByIdApi } from "../../services/user-services";

const initialValues = {
    basic_salary: "",
    audit_salary: "",
    health_insurance: "",
    meal_allowance: "",
    safety_insurance: "",
};
const SalaryWages = ({
    handleSalaryWagesChange,
}: {
    handleSalaryWagesChange: (values: ISalaryWages) => void;
}) => {
    // Get params
    const { id } = useParams<{ id: string }>();
    // Formik
    const {
        values,
        setValues,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: salaryWagesValidation,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        handleSalaryWagesChange(values);
    }, [values, handleSalaryWagesChange]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeRes = await getEmployeeByIdApi(id);
                const employeeData = employeeRes.data;
                setValues(employeeData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEmployeeData();
    }, [id, setValues]);

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
                            htmlFor="audit_salary"
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
                                    id="audit_salary"
                                    className={
                                        errors.audit_salary &&
                                        touched.audit_salary
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.audit_salary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.audit_salary && errors.audit_salary && (
                                <p className="login__message-error">
                                    {errors.audit_salary}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="health_insurance"
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
                                    id="health_insurance"
                                    className={
                                        errors.health_insurance &&
                                        touched.health_insurance
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.health_insurance}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.health_insurance &&
                                errors.health_insurance && (
                                    <p className="login__message-error">
                                        {errors.health_insurance}
                                    </p>
                                )}
                        </div>
                    </div>
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="meal_allowance"
                            className="addnew__salary-label"
                        >
                            Meal Allowance
                            <span className="required">*</span>
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
                    <div className="addnew__salary-input-box">
                        <label
                            htmlFor="safety_insurance"
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
                                    id="safety_insurance"
                                    className={
                                        errors.safety_insurance &&
                                        touched.safety_insurance
                                            ? "addnew__salary-number error"
                                            : "addnew__salary-number"
                                    }
                                    value={values.safety_insurance}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.safety_insurance &&
                                errors.safety_insurance && (
                                    <p className="login__message-error">
                                        {errors.safety_insurance}
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
