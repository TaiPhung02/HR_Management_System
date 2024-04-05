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

const AddNewEmployee = () => {
    const [employeeInfo, setEmployeeInfo] = useState({});
    const [employmentDetails, setEmploymentDetails] = useState(0);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(
            !(employeeInfo && Object.keys(employeeInfo).length > 0) ||
                !employmentDetails
        );
    }, [employeeInfo, employmentDetails]);
    const onChange = (key: string) => {
        console.log(key);
    };

    const handleEmployeeInfoChange = (values) => {
        setEmployeeInfo(values);
    };

    const handleEmploymentDetailsChange = (value) => {
        setEmploymentDetails(value);
    };

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
            });

            console.log(res);

            if (res && res.result === true) {
                toast.success("Employee added successfully");
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
