import React, { useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import "./addNewEmployee.css";
import EmployeeInformation from "../../components/EmployeeInformation/EmployeeInformation";
import ContractInformation from "../../components/ContractInfomation/ContractInformation";
import EmploymentDetails from "../../components/EmploymentDetails/EmploymentDetails";
import SalaryWages from "../../components/SalaryWages/SalaryWages";
import Others from "../../components/Others/Others";
import { toast } from "react-toastify";
import { addNewEmployeeApi } from "../../services/user-services";
import { useNavigate } from "react-router-dom";
import { IEmployee } from "../../interfaces/employee-interface";

const AddNewEmployee = () => {
    const nagivate = useNavigate();
    const [employeeInfo, setEmployeeInfo] = useState<IEmployee>({});
    const [employmentDetails, setEmploymentDetails] = useState(0);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    const onChange = (key: string) => {
        console.log(key);
    };

    // EmployeeInformation
    const handleEmployeeInfoChange = (values: IEmployee) => {
        setEmployeeInfo(values);
    };
    // EmployeeDetail
    const handleEmploymentDetailsChange = (value: number) => {
        setEmploymentDetails(value);
    };

    const handleDepartmentChange = (departmentId) => {
        setSelectedDepartment(departmentId);
    };

    const handlePositionChange = (positionId) => {
        setSelectedPosition(positionId);
    };

    // Handle Add
    const handleAddNewEmployee = async () => {
        console.log(employeeInfo);
        console.log(employmentDetails);

        try {
            const res = await addNewEmployeeApi({
                name: employeeInfo?.name,
                gender: employeeInfo?.gender,
                dob: employeeInfo?.dob,
                ktp_no: employeeInfo?.ktp_no,
                type: employeeInfo?.type,
                contract_start_date: employeeInfo?.contract_start_date,
                hidden_on_payroll: employmentDetails,
                //
                card_number: employeeInfo?.card_number,
                bank_account_no: employeeInfo?.bank_account_no,
                family_card_number: employeeInfo?.family_card_number,
                marriage_code: employeeInfo?.marriage_code,
                mother_name: employeeInfo?.mother_name,
                pob: employeeInfo?.pob,
                home_address_1: employeeInfo?.home_address_1,
                home_address_2: employeeInfo?.home_address_2,
                entitle_ot: employeeInfo?.entitle_ot,
                meal_allowance_paid: employeeInfo?.meal_allowance_paid,
                grade_id: employeeInfo?.grade_id,
                //
                department_id: selectedDepartment,
                position_id: selectedPosition,
            });

            console.log(res);

            if (res && res.result === true) {
                toast.success("Employee added successfully");

                setEmployeeInfo({});
                setEmploymentDetails(0);

                nagivate("/employee");
            } else {
                toast.error("An error occurred, please try again later 1");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("An error occurred, please try again later 2");
        }
    };

    return (
        <div className="table-wrapper">
            <div className="table__header">
                <h1 className="table__header-heading">Employee Management</h1>
                <Button
                    className="addNew__cta-add"
                    onClick={handleAddNewEmployee}
                    disabled={isButtonDisabled}
                >
                    Add
                </Button>
            </div>
            <Tabs
                size="large"
                type="card"
                defaultActiveKey="1"
                onChange={onChange}
            >
                <Tabs.TabPane tab="Employee Infomation" key="1">
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
                    <SalaryWages />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Others" key="5">
                    <Others />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default AddNewEmployee;
