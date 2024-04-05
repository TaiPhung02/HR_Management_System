import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./employmentDetail.css";
import { IPosition } from "../../interfaces/position-interface";
import { IDepartment } from "../../interfaces/department-interface";
import { departmentApi, positionApi } from "../../services/user-services";
import { employmentDetailsSchema } from "../../utils/validate-utils";

const initialValues = {
    hidden_on_payroll: false,
};
const EmploymentDetails = ({ handleEmploymentDetailsChange }) => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [positions, setPositions] = useState<IPosition[]>([]);

    const { values, handleBlur, handleChange, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: employmentDetailsSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        const newValue = values.hidden_on_payroll ? 1 : 0;
        handleEmploymentDetailsChange(newValue);
    }, [values, handleEmploymentDetailsChange]);

    const fetchData = async () => {
        try {
            const departmentsRes = await departmentApi();
            const positionsRes = await positionApi();
            if (
                departmentsRes &&
                departmentsRes.data &&
                positionsRes &&
                positionsRes.data
            ) {
                setDepartments(departmentsRes.data);
                setPositions(positionsRes.data);
            } else {
                console.error("No data returned from API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="addnew-container">
            <div className="addnew__header">
                <h2 className="addnew__header-heading">Employment Details</h2>
                <p className="addnew__header-desc">
                    Required (<span className="required">*</span>)
                </p>
            </div>
            <div className="addnew__header-line"></div>
            <div className="addnew__employment">
                <div className="addnew__employment-input-box">
                    <label htmlFor="name" className="addnew__employment-label">
                        Department
                    </label>
                    <select
                        name="gender"
                        className="addnew__employment-select"
                        defaultValue={"1"}
                    >
                        <option value="1" disabled hidden>
                            Choose Department
                        </option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="addnew__employment-input-box">
                    <label htmlFor="name" className="addnew__employment-label">
                        Position
                    </label>
                    <select
                        name="gender"
                        className="addnew__employment-select"
                        defaultValue={"1"}
                    >
                        <option value="1" disabled hidden>
                            Choose Position
                        </option>
                        {positions.map((position) => (
                            <option key={position.id} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="addnew__employment-checkbox-box">
                    <input
                        id="hidden_on_payroll"
                        name="hidden_on_payroll"
                        type="checkbox"
                        className="addnew__employment-checkbox"
                        checked={values.hidden_on_payroll}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label
                        htmlFor="hidden_on_payroll"
                        className="addnew__employment-label"
                    >
                        Hidden on payroll<span className="required">*</span>
                    </label>
                </div>
                {touched.hidden_on_payroll && errors.hidden_on_payroll && (
                    <p className="login__message-error">
                        {errors.hidden_on_payroll}
                    </p>
                )}
                <div className="addnew__employment-checkbox-box">
                    <input
                        type="checkbox"
                        className="addnew__employment-checkbox"
                        id="entitled_ot"
                    />
                    <label
                        htmlFor="entitled_ot"
                        className="addnew__employment-label"
                    >
                        Entitled OT
                    </label>
                </div>
                <div className="addnew__employment-checkbox-box">
                    <input
                        type="checkbox"
                        className="addnew__employment-checkbox"
                        id="meal_allowance_paid"
                    />
                    <label
                        htmlFor="meal_allowance_paid"
                        className="addnew__employment-label"
                    >
                        Meal Allowance Paid
                    </label>
                </div>
            </div>
        </div>
    );
};

export default EmploymentDetails;
