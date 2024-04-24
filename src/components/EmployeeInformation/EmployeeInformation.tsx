import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import "./employeeInformation.css";
import { DatePicker } from "antd";
import { IMarriage } from "../../interfaces/marriage-interface";
import { getEmployeeByIdApi, marriageApi } from "../../services/user-services";
import { employeeInformationValidation } from "../../utils/validate-utils";
import { IEmployee } from "../../interfaces/employee-interface";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

const initialValues = {
    staff_id: "",
    // Required
    name: "",
    gender: "",
    dob: "",
    ktp_no: "",
    nc_id: "",
    type: "",
    contract_start_date: "",
    // Not Required
    card_number: "",
    bank_account_no: "",
    family_card_number: "",
    marriage_id: 0,
    mother_name: "",
    pob: "",
    home_address_1: "",
    home_address_2: "",
    grade_id: "",
};

const EmployeeInformation = ({
    handleEmployeeInfoChange,
    checkIsValidInfor,
}: {
    handleEmployeeInfoChange: (values: IEmployee) => void;
    checkIsValidInfor: (isValid: boolean) => void;
}) => {
    // Get params
    const { id } = useParams<{ id: string }>();
    // Get marriages
    const [marriages, setMarriages] = useState<IMarriage[]>([]);
    // Formik
    const {
        values,
        setValues,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        isValid,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: employeeInformationValidation,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    // handleEmployeeInfoChange
    useEffect(() => {
        handleEmployeeInfoChange(values);
        checkIsValidInfor(isValid);
    }, [values, handleEmployeeInfoChange, isValid, checkIsValidInfor]);

    // handleDateChange
    const handleDateChange = (date: Dayjs | null, field: string): void => {
        const formattedDate = date ? date.format("YYYY-MM-DD") : "";
        handleChange({
            target: {
                name: field,
                value: formattedDate,
            },
        });
    };
    // Get marriages
    useEffect(() => {
        const fetchMarriagesData = async () => {
            try {
                const marriagesRes = await marriageApi();
                if (marriagesRes && marriagesRes.data) {
                    setMarriages(marriagesRes.data);
                } else {
                    console.error("No data returned from API");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchMarriagesData();
    }, []);
    // Get employee by id
    useEffect(() => {
        if (id) {
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
        }
    }, [id, setValues]);

    return (
        <div className="addnew-container">
            <div className="addnew__header">
                <h2 className="addnew__header-heading">Personal Information</h2>
                <p className="addnew__header-desc">
                    Required (<span className="required">*</span>)
                </p>
            </div>
            <div className="addnew__header-line"></div>
            <div>
                <form
                    action=""
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="addnew__employee"
                >
                    {id && (
                        <div className="addnew__employee-input-box">
                            <label
                                htmlFor="staff_id"
                                className="addnew__employee-label"
                            >
                                NIK
                            </label>
                            <div className="addnew__employee-input-wrapper">
                                <input
                                    id="staff_id"
                                    name="staff_id"
                                    type="text"
                                    className="addnew__employee-input disabled"
                                    value={values.staff_id}
                                    disabled
                                />
                            </div>
                        </div>
                    )}
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="name"
                            className="addnew__employee-label"
                        >
                            Name<span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={
                                    errors.name && touched.name
                                        ? "addnew__employee-input error"
                                        : "addnew__employee-input"
                                }
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name && (
                                <p className="login__message-error">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="gender"
                            className="addnew__employee-label"
                        >
                            Gender<span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <select
                                id="gender"
                                name="gender"
                                className={
                                    errors.gender && touched.gender
                                        ? "addnew__employee-select error"
                                        : "addnew__employee-select"
                                }
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled hidden>
                                    Choose Gender
                                </option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                            {touched.gender && errors.gender && (
                                <p className="login__message-error">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="card_number"
                            className="addnew__employee-label"
                        >
                            Card Number
                        </label>
                        <input
                            id="card_number"
                            name="card_number"
                            type="text"
                            className="addnew__employee-input"
                            value={values.card_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="bank_account_no"
                            className="addnew__employee-label"
                        >
                            Account Number
                        </label>
                        <input
                            id="bank_account_no"
                            name="bank_account_no"
                            type="text"
                            className="addnew__employee-input"
                            value={values.bank_account_no}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="family_card_number"
                            className="addnew__employee-label"
                        >
                            Family Card No.
                        </label>
                        <input
                            id="family_card_number"
                            name="family_card_number"
                            type="text"
                            className="addnew__employee-input"
                            value={values.family_card_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="marriage_id"
                            className="addnew__employee-label"
                        >
                            Marriage Status
                        </label>
                        <select
                            id="marriage_id"
                            name="marriage_id"
                            className="addnew__employee-select"
                            value={values.marriage_id}
                            onChange={handleChange}
                        >
                            <option value="" hidden>
                                Choose Marriage Status
                            </option>
                            {marriages.map((marriage) => (
                                <option key={marriage.id} value={marriage.id}>
                                    {marriage.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="mother_name"
                            className="addnew__employee-label"
                        >
                            Mother Name
                        </label>
                        <input
                            id="mother_name"
                            name="mother_name"
                            type="text"
                            className="addnew__employee-input"
                            value={values.mother_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label htmlFor="dob" className="addnew__employee-label">
                            Date of birth<span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <DatePicker
                                id="dob"
                                name="dob"
                                className={
                                    errors.dob && touched.dob
                                        ? "addnew__employee-date-box error"
                                        : "addnew__employee-date-box"
                                }
                                value={
                                    values.dob
                                        ? dayjs(values.dob, "YYYY-MM-DD")
                                        : null
                                }
                                onChange={(date) =>
                                    handleDateChange(date, "dob")
                                }
                                onBlur={handleBlur}
                            />
                            {touched.dob && errors.dob && (
                                <p className="login__message-error">
                                    {errors.dob}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="addnew__employee-input-box">
                        <label htmlFor="pob" className="addnew__employee-label">
                            Place of birth
                        </label>
                        <input
                            id="pob"
                            name="pob"
                            type="text"
                            className="addnew__employee-input"
                            value={values.pob}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="home_address_1"
                            className="addnew__employee-label"
                        >
                            Home Address 1
                        </label>
                        <input
                            id="home_address_1"
                            name="home_address_1"
                            type="text"
                            className="addnew__employee-input"
                            value={values.home_address_1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="home_address_2"
                            className="addnew__employee-label"
                        >
                            Home Address 2
                        </label>
                        <input
                            id="home_address_2"
                            name="home_address_2"
                            type="text"
                            className="addnew__employee-input"
                            value={values.home_address_2}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="ktp_no"
                            className="addnew__employee-label"
                        >
                            KTP No.<span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <input
                                id="ktp_no"
                                name="ktp_no"
                                type="text"
                                className={
                                    errors.ktp_no && touched.ktp_no
                                        ? "addnew__employee-input error"
                                        : "addnew__employee-input"
                                }
                                value={values.ktp_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.ktp_no && errors.ktp_no && (
                                <p className="login__message-error">
                                    {errors.ktp_no}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="nc_id"
                            className="addnew__employee-label"
                        >
                            National ID
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <input
                                id="nc_id"
                                name="nc_id"
                                type="text"
                                className="addnew__employee-input"
                                value={values.nc_id}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="contracts"
                            className="addnew__employee-label"
                        >
                            Contract Record
                        </label>
                        <input
                            id="contracts"
                            name="contracts"
                            type="text"
                            className="addnew__employee-input"
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="contract_start_date"
                            className="addnew__employee-label"
                        >
                            Date Start
                            <span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <DatePicker
                                id="contract_start_date"
                                name="contract_start_date"
                                className={
                                    errors.contract_start_date &&
                                    touched.contract_start_date
                                        ? "addnew__employee-date-box error"
                                        : "addnew__employee-date-box"
                                }
                                value={
                                    values.contract_start_date
                                        ? dayjs(
                                              values.contract_start_date,
                                              "YYYY-MM-DD"
                                          )
                                        : null
                                }
                                onChange={(date) =>
                                    handleDateChange(
                                        date,
                                        "contract_start_date"
                                    )
                                }
                                onBlur={handleBlur}
                            />
                            {touched.contract_start_date &&
                                errors.contract_start_date && (
                                    <p className="login__message-error">
                                        {errors.contract_start_date}
                                    </p>
                                )}
                        </div>
                    </div>

                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="type"
                            className="addnew__employee-label"
                        >
                            Employee Type<span className="required">*</span>
                        </label>
                        <div className="addnew__employee-input-wrapper">
                            <select
                                id="type"
                                name="type"
                                className={
                                    errors.type && touched.type
                                        ? "addnew__employee-select error"
                                        : "addnew__employee-select"
                                }
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" hidden>
                                    Choose Employee Type
                                </option>
                                <option value="0">Permanent worker</option>
                                <option value="1">Part-time worker</option>
                                <option value="2">Contract worker</option>
                            </select>
                            {touched.type && errors.type && (
                                <p className="login__message-error">
                                    {errors.type}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <div className="addnew__employee-input-box">
                        <label
                            htmlFor="entitle_ot"
                            className="addnew__employee-label"
                        >
                            OT paid
                        </label>
                        <input
                            id="entitle_ot"
                            name="entitle_ot"
                            type="text"
                            className="addnew__employee-input"
                            value={values.entitle_ot}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="meal_allowance_paid"
                            className="addnew__employee-label"
                        >
                            Meal paid
                        </label>
                        <input
                            id="meal_allowance_paid"
                            name="meal_allowance_paid"
                            type="text"
                            className="addnew__employee-input"
                            value={values.meal_allowance_paid}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="addnew__employee-input-box">
                        <label
                            htmlFor="grade_id"
                            className="addnew__employee-label"
                        >
                            Grading
                        </label>
                        <input
                            id="grade_id"
                            name="grade_id"
                            type="text"
                            className="addnew__employee-input"
                            value={values.grade_id}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeInformation;
