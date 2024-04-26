import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import "./employeeInformation.css";
import { IMarriage } from "../../interfaces/marriage-interface";
import { getEmployeeByIdApi, marriageApi } from "../../services/user-services";
import { employeeInformationValidation } from "../../utils/validate-utils";
import { IEmployee } from "../../interfaces/employee-interface";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import MapSelectField from "../../common/MapSelectField/MapSelectField";
import DatePickerField from "../../common/DatePickerField/DatePickerField";

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
  marriage_id: "",
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
            <InputField
              label="NIK"
              required={false}
              name="staff_id"
              type="text"
              value={values.staff_id}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.staff_id}
              error={errors.staff_id}
              disabled={true}
            />
          )}

          <InputField
            label="Name"
            required={true}
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
          />

          <SelectField
            label="Gender"
            required={true}
            name="gender"
            value={values.gender}
            options={[
              { value: "0", label: "Male" },
              { value: "1", label: "Female" },
            ]}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.gender}
            error={errors.gender}
          />

          <InputField
            label="Card Number"
            required={false}
            name="card_number"
            type="text"
            value={values.card_number}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.card_number}
            error={errors.card_number}
          />

          <InputField
            label="Account Number"
            required={false}
            name="bank_account_no"
            type="text"
            value={values.bank_account_no}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.bank_account_no}
            error={errors.bank_account_no}
          />

          <InputField
            label="Family Card No."
            required={false}
            name="family_card_number"
            type="text"
            value={values.family_card_number}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.family_card_number}
            error={errors.family_card_number}
          />

          <MapSelectField
            label="Marriage Status"
            required={false}
            name="marriage_id"
            value={values.marriage_id}
            options={marriages.map((marriage) => ({
              id: marriage.id,
              name: marriage.name,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.marriage_id}
            error={errors.marriage_id}
          />

          <InputField
            label="Mother Name"
            required={false}
            name="mother_name"
            type="text"
            value={values.mother_name}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.mother_name}
            error={errors.mother_name}
          />

          <DatePickerField
            label="Date of birth"
            required
            name="dob"
            value={values.dob}
            onChange={(date) => handleDateChange(date, "dob")}
            onBlur={handleBlur}
            touched={touched.dob}
            error={errors.dob}
          />

          <InputField
            label="Place of birth"
            required={false}
            name="pob"
            type="text"
            value={values.pob}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.pob}
            error={errors.pob}
          />

          <InputField
            label="Home Address 1"
            required={false}
            name="home_address_1"
            type="text"
            value={values.home_address_1}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.home_address_1}
            error={errors.home_address_1}
          />

          <InputField
            label="Home Address 2"
            required={false}
            name="home_address_2"
            type="text"
            value={values.home_address_2}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.home_address_2}
            error={errors.home_address_2}
          />

          <InputField
            label="KTP No."
            required={true}
            name="ktp_no"
            type="text"
            value={values.ktp_no}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.ktp_no}
            error={errors.ktp_no}
          />

          <InputField
            label="National ID"
            required={false}
            name="nc_id"
            type="text"
            value={values.nc_id}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.nc_id}
            error={errors.nc_id}
          />

          <div className="addnew__employee-input-box">
            <label htmlFor="contracts" className="addnew__employee-label">
              Contract Record
            </label>
            <input
              id="contracts"
              name="contracts"
              type="text"
              className="addnew__employee-input"
            />
          </div>

          <DatePickerField
            label="Date Start"
            required
            name="contract_start_date"
            value={values.contract_start_date}
            onChange={(date) => handleDateChange(date, "contract_start_date")}
            onBlur={handleBlur}
            touched={touched.contract_start_date}
            error={errors.contract_start_date}
          />

          <SelectField
            label="Employee Type"
            required={true}
            name="type"
            value={values.type}
            options={[
              { value: "0", label: "Permanent worker" },
              { value: "1", label: "Part-time worker" },
              { value: "2", label: "Contract worker" },
            ]}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.type}
            error={errors.type}
          />

          <InputField
            label="Grading"
            required={false}
            name="grade_id"
            type="text"
            value={values.grade_id}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.grade_id}
            error={errors.grade_id}
          />
        </form>
      </div>
    </div>
  );
};

export default EmployeeInformation;
