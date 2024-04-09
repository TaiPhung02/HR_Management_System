import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Pagination, Modal } from "antd";
import { deleteEmployeeApi, employeeApi } from "../../services/user-services";
import { IEmployee } from "../../interfaces/employee-interface";
import "./employeeTable.css";
import {
    DeleteOutlined,
    FileAddOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
        render: (text: string, employee: IEmployee) => {
            return employee.gender === 0 ? "Male" : "Female";
        },
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
        dataIndex: "contracts",
    },
    {
        title: "Department",
        dataIndex: "department_name",
    },
    {
        title: "Employee Type",
        dataIndex: "type",
        render: (text: string) => {
            switch (text) {
                case "0":
                    return "Permanent worker";
                case "1":
                    return "Part-time worker";
                case "2":
                    return "Contract worker";
                default:
                    return "Unknown";
            }
        },
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
        dataIndex: "contract_date",
    },
    // {
    //     title: "Contract Second signed date",
    //     dataIndex: "contracts",
    // },
    {
        title: "Contract End signed date",
        dataIndex: "contracts",
    },
    {
        title: "Entitled OT",
        dataIndex: "entitle_ot",
        render: (text: string) => {
            return text === "1" ? "Yes" : "No";
        },
    },
    {
        title: "Meal paid",
        dataIndex: "meal_allowance_paid",
        render: (text: string) => {
            return text === "1" ? "Yes" : "No";
        },
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
    // Location
    const location = useLocation();
    const navigate = useNavigate();
    // Table
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    // Employee
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Select
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        const selectedEmployeeIds = employees
            .filter((employee) => newSelectedRowKeys.includes(employee.key))
            .map((selectedEmployee) => selectedEmployee.id);

        console.log("Selected Employee IDs: ", selectedEmployeeIds);

        setSelectedEmployees(selectedEmployeeIds);
    };

    const rowSelection = {
        selectedEmployees,
        onChange: onSelectChange,
    };

    const hasSelected = selectedEmployees.length > 0;

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
            toast.error("Error fetching data: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get("page");
        const pageSizeParam = searchParams.get("pageSize");
        if (pageParam) {
            setCurrentPage(parseInt(pageParam));
        }
        if (pageSizeParam) {
            setPageSize(parseInt(pageSizeParam));
        }
    }, [location.search]);

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }

        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", page.toString());
        if (pageSize) {
            searchParams.set("pageSize", pageSize.toString());
        }

        window.history.replaceState(
            {},
            "",
            `${location.pathname}?${searchParams}`
        );

        fetchData(page, pageSize || 20);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);

        fetchData(1, size);

        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", "1");
        searchParams.set("pageSize", size.toString());
        window.history.replaceState(
            {},
            "",
            `${location.pathname}?${searchParams}`
        );
    };

    const handleDeleteEmployee = async () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const deleteRes = await deleteEmployeeApi(selectedEmployees);
            console.log(deleteRes);

            if (deleteRes.result === true) {
                const updatedEmployees = employees.filter(
                    (employee) => !selectedEmployees.includes(employee.id)
                );
                setEmployees(updatedEmployees);
                setSelectedEmployees([]);
                toast.success("Selected employees deleted successfully.");

                setIsModalOpen(false);

                if (updatedEmployees.length === 0 && total > 0) {
                    setCurrentPage(1);
                    fetchData(1, pageSize);
                }
            } else {
                toast.error("Failed to delete selected employees.");
            }
        } catch (error) {
            console.error("Error deleting employees:", error);
            toast.error("An error occurred while deleting employees.");
        }
    };

    // Handler for canceling deletion
    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleRowClick = (record: IEmployee) => {
        navigate(`/employee/create-or-update/${record.id}`);
    };

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
                        onClick={handleDeleteEmployee}
                        disabled={!hasSelected}
                    >
                        <DeleteOutlined /> Delete
                    </Button>

                    <Modal
                        className="employee__table-delete-modal"
                        title="Delete"
                        open={isModalOpen}
                        onOk={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    >
                        <p>Are you sure you want to delete?</p>
                    </Modal>
                </div>
                <div className="table__line"></div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={employees}
                    loading={loading}
                    pagination={false}
                    className="employee__table-row"
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
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
