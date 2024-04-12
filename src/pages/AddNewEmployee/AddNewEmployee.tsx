import React, { useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import "./addNewEmployee.css";
import EmployeeInformation from "../../components/EmployeeInformation/EmployeeInformation";
import ContractInformation from "../../components/ContractInfomation/ContractInformation";
import EmploymentDetails from "../../components/EmploymentDetails/EmploymentDetails";
import SalaryWages from "../../components/SalaryWages/SalaryWages";
import Others from "../../components/Others/Others";
import { toast } from "react-toastify";
import {
    addNewEmployeeApi,
    editEmployeeApi,
} from "../../services/user-services";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../interfaces/employee-interface";
import { ISalaryWages } from "../../interfaces/salaryWages-interface";
import { PiWarningCircle } from "react-icons/pi";

const AddNewEmployee = () => {
    // Get params
    const { id } = useParams<{ id?: string }>();
    // check id in URL
    const isEditMode = !!id;
    // Navigate
    const navigate = useNavigate();
    // State EmployeeInformation
    const [employeeInfo, setEmployeeInfo] = useState<IEmployee>({});
    // State EmployeeDetails
    const [employmentDetails, setEmploymentDetails] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
        null
    );
    const [selectedPosition, setSelectedPosition] = useState<number | null>(
        null
    );
    // State SalaryWages
    const [salaryWages, setSalaryWages] = useState<ISalaryWages>({});
    // State Button
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    // const [isErrorsField, setIsErrorsField] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(
            !(
                employeeInfo &&
                employeeInfo.name &&
                employeeInfo.gender &&
                employeeInfo.dob &&
                employeeInfo.ktp_no &&
                employeeInfo.type &&
                employeeInfo.contract_start_date &&
                Object.keys(employeeInfo).length > 0
            ) || !employmentDetails
        );
    }, [employeeInfo, employmentDetails]);

    // Handle Add
    const handleAddNewEmployee = async () => {
        console.log(employeeInfo);
        console.log(employmentDetails);

        try {
            const res = await addNewEmployeeApi({
                ...employeeInfo,
                department_id: selectedDepartment,
                position_id: selectedPosition,
                hidden_on_payroll: employmentDetails,
                ...salaryWages,
            });

            if (res && res.result === true) {
                toast.success("Employee added successfully");

                setEmployeeInfo({});
                setEmploymentDetails(0);

                navigate("/employee");
            } else {
                toast.error("An error occurred, please try again later 1");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("An error occurred, please try again later 2");
        }
    };

    // HandleEditEmployee
    const handleEditEmployee = async () => {
        try {
            const res = await editEmployeeApi(id, {
                ...employeeInfo,
                department_id: selectedDepartment,
                position_id: selectedPosition,
                hidden_on_payroll: employmentDetails,
                ...salaryWages,
            });

            if (res && res.result === true) {
                toast.success("Employee edited successfully");
                window.history.back();
            } else {
                toast.error("Failed to edit employee. Please try again later.");
            }
        } catch (error) {
            toast.error(
                "An error occurred while editing employee. Please try again later."
            );
        }
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    // EmployeeInformation
    const handleEmployeeInfoChange = (values: IEmployee) => {
        console.log(values);
        setEmployeeInfo(values);
    };
    // EmployeeDetail
    const handleEmploymentDetailsChange = (value: number) => {
        console.log(value);
        setEmploymentDetails(value);
    };

    const handleDepartmentChange = (departmentId: number) => {
        console.log(departmentId);
        setSelectedDepartment(departmentId);
    };

    const handlePositionChange = (positionId: number) => {
        console.log(positionId);
        setSelectedPosition(positionId);
    };

    // SalaryWages
    const handleSalaryWagesChange = (values: ISalaryWages) => {
        console.log(values);
        setSalaryWages(values);
    };

    return (
        <div className="table-wrapper">
            <div className="table__header">
                <h1 className="table__header-heading">Employee Management</h1>
                {isEditMode ? (
                    <Button
                        className="addNew__cta-save"
                        onClick={handleEditEmployee}
                    >
                        Save Changes
                    </Button>
                ) : (
                    <Button
                        className="addNew__cta-add"
                        onClick={handleAddNewEmployee}
                        disabled={isButtonDisabled}
                    >
                        Add
                    </Button>
                )}
            </div>
            <Tabs
                size="large"
                type="card"
                defaultActiveKey="1"
                onChange={onChange}
            >
                <Tabs.TabPane
                    tab={
                        <span className="addnew_table">
                            Employee Information
                            <PiWarningCircle />
                        </span>
                    }
                    key="1"
                >
                    <EmployeeInformation
                        handleEmployeeInfoChange={handleEmployeeInfoChange}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Contract Information" key="2">
                    <ContractInformation />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Employment Details" key="3">
                    <EmploymentDetails
                        handleDepartmentChange={handleDepartmentChange}
                        handlePositionChange={handlePositionChange}
                        handleEmploymentDetailsChange={
                            handleEmploymentDetailsChange
                        }
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Salary & Wages" key="4">
                    <SalaryWages
                        handleSalaryWagesChange={handleSalaryWagesChange}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Others" key="5">
                    <Others />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default AddNewEmployee;
