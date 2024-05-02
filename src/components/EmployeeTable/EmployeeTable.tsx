import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Pagination, Modal } from "antd";
import {
  deleteEmployeeApi,
  searchEmployeeApi,
} from "../../services/user-services";
import { IEmployee } from "../../interfaces/employee-interface";
import "./employeeTable.css";
import {
  DeleteOutlined,
  FileAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { debounce } from "lodash";

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

  // State Search
  const [searchText, setSearchText] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Column
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
        return employee?.gender == 0 ? "Male" : "Female";
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
      dataIndex: "nc_id",
    },
    {
      title: "Date Start",
      dataIndex: "contract_start_date",
    },
    {
      title: "Contract Record",
      // dataIndex: "contracts",
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

    {
      title: "Entitled OT",
      dataIndex: "entitle_ot",
      render: (text: number) => {
        return text === 1 ? "Yes" : "No";
      },
    },
    {
      title: "Meal paid",
      dataIndex: "meal_allowance_paid",
      render: (text: number) => {
        return text === 1 ? "Yes" : "No";
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

  // Select row
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedEmployeeIds = employees
      .filter((employee) =>
        newSelectedRowKeys.includes(employee.key as React.Key)
      )
      .map((selectedEmployee) => selectedEmployee.id);

    console.log("Selected Employee IDs: ", selectedEmployeeIds);

    setSelectedEmployees(
      selectedEmployeeIds.filter((id): id is number => id !== undefined)
    );
  };

  const rowSelection = {
    selectedEmployees,
    onChange: onSelectChange,
  };

  const hasSelected = selectedEmployees.length > 0;

  // Call api
  const fetchData = async (
    page: number,
    size: number,
    searchText?: string | undefined
  ) => {
    try {
      setLoading(true);
      const employeeRes = await searchEmployeeApi(page, size, searchText);

      const totalRecords = employeeRes.data.total;
      const employeeWithKeys = employeeRes.data.data.map(
        (employee: IEmployee) => ({
          ...employee,
          key: employee.id,
        })
      );

      setEmployees(employeeWithKeys);
      setTotal(totalRecords);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data: " + error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchData = useMemo(() => {
    return debounce(async (page: number, size: number, searchText: string) => {
      fetchData(page, size, searchText);
    }, 300);
  }, []);

  useEffect(() => {
    debounceFetchData(currentPage, pageSize, searchText);
  }, [currentPage, pageSize, searchText, debounceFetchData]);

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

  // Pagination
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }

    console.log(page, pageSize, searchText);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());

    if (pageSize) {
      searchParams.set("pageSize", pageSize.toString());
    }

    if (searchText) {
      searchParams.set("search", searchText);
    }

    window.history.replaceState({}, "", `${location.pathname}?${searchParams}`);

    fetchData(page, pageSize || 20, searchText);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", "1");
    searchParams.set("pageSize", size.toString());

    if (searchText) {
      searchParams.set("search", searchText);
    }

    window.history.replaceState({}, "", `${location.pathname}?${searchParams}`);

    fetchData(1, size, searchText);
  };

  // handleSearch
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setCurrentPage(1);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", "1");
    searchParams.set("pageSize", pageSize.toString());
    searchParams.set("search", value);
    navigate(`${location.pathname}?${searchParams}`);

    // debounceSearch(e);
    debounceFetchData(1, pageSize, value);
  };

  // handleDeleteEmployee
  const handleDeleteEmployee = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const deleteRes = await deleteEmployeeApi(selectedEmployees);
      console.log(deleteRes);

      if (deleteRes && deleteRes.result === true) {
        const updatedEmployees = employees.filter(
          (employee) =>
            employee.id !== undefined &&
            !selectedEmployees.includes(employee.id)
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
            className="table__header-text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
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
            className={
              !hasSelected ? "table__cta-delete disable" : "table__cta-delete"
            }
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
            okText="Yes"
            cancelText="No"
          >
            <p>Are you sure you want to delete?</p>
          </Modal>
        </div>
        <div className="table__line"></div>

        <Table
          size="small"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={employees}
          loading={loading}
          pagination={false}
          bordered
          className="employee__table-row"
          onRow={(record) => ({
            onDoubleClick: () => handleRowClick(record),
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
