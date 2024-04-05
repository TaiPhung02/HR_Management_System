import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "antd";
import { employeeApi } from "../../services/user-services";
import { IEmployee } from "../../interfaces/employee-interface";
import "./employeeTable.css";
import {
    DeleteOutlined,
    FileAddOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
    {
        title: "NIK",
        dataIndex: "staff_id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Gender",
        dataIndex: "gender",
    },
    {
        title: "Card number",
        dataIndex: "card_number",
    },
    {
        title: "Account Number",
        dataIndex: "bank_account_no",
    },
    {
        title: "Family Card Number",
        dataIndex: "family_card_number",
    },
    {
        title: "Marriage Status",
        dataIndex: "marriage_code",
    },
    {
        title: "Mother Name",
        dataIndex: "mother_name",
    },
    {
        title: "Place & Date of Birth",
        dataIndex: "dob",
    },
    {
        title: "Home Address",
        dataIndex: "home_address_1",
    },
    {
        title: "National ID Card No.",
        dataIndex: "card_number",
    },
    {
        title: "Date Start",
        dataIndex: "contract_start_date",
    },
    {
        title: "Contract Record",
        dataIndex: "emergency_contract",
    },
    {
        title: "Department",
        dataIndex: "department_name",
    },
    {
        title: "Employee Type",
        dataIndex: "type",
    },
    {
        title: "Basic Salary",
        dataIndex: "basic_salary",
    },
    {
        title: "Position",
        dataIndex: "position_name",
    },
    {
        title: "Contract First signed date",
        dataIndex: "contracts",
    },
    {
        title: "Contract Second signed date",
        dataIndex: "contracts",
    },
    {
        title: "Contract End signed date",
        dataIndex: "contracts",
    },
    {
        title: "OT paid",
        dataIndex: "entitle_ot",
    },
    {
        title: "Meal paid",
        dataIndex: "meal_allowance_paid",
    },
    {
        title: "Meal allowance",
        dataIndex: "meal_allowance",
    },
    {
        title: "Grading",
        dataIndex: "grade_name",
    },
];

const EmployeeTable = () => {
    // Table
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(true);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    // Employee
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    // Select
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    // Call api
    const fetchData = async (page: number, size: number) => {
        try {
            setLoading(true);
            const employeeRes = await employeeApi(page, size);
            const totalRecords = employeeRes.data.total;
            setTotal(totalRecords);
            const employeeWithKeys = employeeRes.data.data.map(
                (employee: IEmployee) => ({
                    ...employee,
                    key: employee.id,
                    nik: employee.id,
                })
            );
            setEmployees(employeeWithKeys);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    console.log(employees);

    return (
        <div className="table-wrapper">
            <div className="table__header">
                <h1 className="table__header-heading">Employee Management</h1>
                <div className="table__header-search">
                    <SearchOutlined className="table__header-icon" />
                    <input
                        type="text"
                        name="Search"
                        placeholder="Search"
                        className="table__header-text"
                    />
                </div>
            </div>

            <div className="employee__table">
                <div className="table__cta">
                    <Button className="table__cta-add">
                        <Link to={"/employee/create-or-update"}>
                            <FileAddOutlined /> Add
                        </Link>
                    </Button>
                    <Button
                        className="table__cta-delete"
                        disabled={!hasSelected}
                    >
                        <DeleteOutlined /> Delete
                    </Button>
                </div>
                <div className="table__line"></div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={employees}
                    loading={loading}
                    pagination={false}
                    className="employee__table-row"
                />
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                />
            </div>
        </div>
    );
};

export default EmployeeTable;
