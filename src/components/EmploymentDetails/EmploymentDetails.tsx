import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import "./employmentDetail.css";
import { IPosition } from "../../interfaces/position-interface";
import { IDepartment } from "../../interfaces/department-interface";
import {
    departmentApi,
    getEmployeeByIdApi,
    positionApi,
} from "../../services/user-services";
import { employmentDetailsSchema } from "../../utils/validate-utils";
import { useParams } from "react-router-dom";
import { IEmployee } from "../../interfaces/employee-interface";

interface EmploymentDetailsProps {
    handleEmploymentDetailsChange: (values: IEmployee) => void;
}

const initialValues = {
    department_id: 0,
    position_id: 0,
    hidden_on_payroll: false,
    entitle_ot: false,
    meal_allowance_paid: false,
};
const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({
    handleEmploymentDetailsChange,
}) => {
    // Get params
    const { id } = useParams<{ id: string }>();
    // state Departments, Positions
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [positions, setPositions] = useState<IPosition[]>([]);

    const { values, setValues, handleBlur, handleChange, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: employmentDetailsSchema,
            onSubmit: (values) => {
                console.log(values);
            },
        });

    useEffect(() => {
        fetchData();
    }, []);

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

    // Get Employee by id
    useEffect(() => {
        if (id) {
            const fetchEmployeeData = async () => {
                try {
                    const employeeRes = await getEmployeeByIdApi(id);
                    const employeeData = employeeRes.data;
                    const updatedEmployeeData = {
                        ...employeeData,
                        hidden_on_payroll: employeeData.hidden_on_payroll === 1,
                        entitle_ot: employeeData.entitle_ot === 1,
                        meal_allowance_paid:
                            employeeData.meal_allowance_paid === 1,
                    };
                    setValues(updatedEmployeeData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchEmployeeData();
        }
    }, [id, setValues]);

    // handleEmploymentDetailsChange
    const newValues = useMemo(
        () => ({
            department_id: values.department_id,
            position_id: values.position_id,
            hidden_on_payroll: values.hidden_on_payroll ? 1 : 0,
            entitle_ot: values.entitle_ot ? 1 : 0,
            meal_allowance_paid: values.meal_allowance_paid ? 1 : 0,
        }),
        [values]
    );

    useEffect(() => {
        handleEmploymentDetailsChange(newValues);
    }, [newValues, handleEmploymentDetailsChange]);

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
                    <label
                        htmlFor="department_id"
                        className="addnew__employment-label"
                    >
                        Department
                    </label>
                    <select
                        id="department_id"
                        name="department_id"
                        className="addnew__employment-select"
                        value={values.department_id}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>
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
                    <label
                        htmlFor="position_id"
                        className="addnew__employment-label"
                    >
                        Position
                    </label>
                    <select
                        id="position_id"
                        name="position_id"
                        className="addnew__employment-select"
                        value={values.position_id}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>
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
                        id="entitle_ot"
                        name="entitle_ot"
                        type="checkbox"
                        className="addnew__employment-checkbox"
                        checked={values.entitle_ot}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label
                        htmlFor="entitle_ot"
                        className="addnew__employment-label"
                    >
                        Entitled OT
                    </label>
                </div>
                <div className="addnew__employment-checkbox-box">
                    <input
                        id="meal_allowance_paid"
                        name="meal_allowance_paid"
                        type="checkbox"
                        className="addnew__employment-checkbox"
                        checked={values.meal_allowance_paid}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
