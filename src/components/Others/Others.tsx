import React, { useEffect, useMemo, useState } from "react";

import { Button, Select, Table, Upload, message } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import type { TableColumnsType, UploadProps } from "antd";
import "./others.css";

import { IGrade } from "../../interfaces/grade-interface";
import { IBenefit } from "../../interfaces/benefit-interface";
import {
    benefitApi,
    getEmployeeByIdApi,
    gradeApi,
    userApi,
} from "../../services/user-services";
import { IUser } from "../../interfaces/user-interface";
import { IEmployee } from "../../interfaces/employee-interface";
import { useParams } from "react-router-dom";

interface DataType {
    id: string | number;
    name: string;
    created_at: string;
}

const Others = ({
    handleOtherChange,
    deleteIds,
    setDeleteIds,
}: {
    handleOtherChange: (values: IEmployee) => void;
    deleteIds: string[];
    setDeleteIds: any;
}) => {
    // Get params
    const { id } = useParams<{ id: string }>();
    // state map
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [benefits, setBenefits] = useState<IBenefit[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    // state select
    const [selectedGrade, setSelectedGrade] = useState<string>("");
    const [selectedBenefit, setSelectedBenefit] = useState<string[]>([]);
    const [remark, setRemark] = useState<string>("");
    // Total file

    const fetchData = async () => {
        try {
            const gradesRes = await gradeApi();
            const benefitsRes = await benefitApi();
            const usersRes = await userApi();

            if (
                gradesRes &&
                gradesRes.data &&
                benefitsRes &&
                benefitsRes.data &&
                usersRes &&
                usersRes.data &&
                Array.isArray(gradesRes.data) &&
                Array.isArray(benefitsRes.data) &&
                Array.isArray(usersRes.data.data)
            ) {
                setGrades(gradesRes.data);
                setBenefits(benefitsRes.data);
                setUsers(usersRes.data.data);
            } else {
                console.error("No valid data returned from API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Get employee by id
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                if (id) {
                    const employeeRes = await getEmployeeByIdApi(id);
                    const employeeData = employeeRes.data;

                    setSelectedGrade(employeeData?.grade_id?.toString());

                    const benefitNames = employeeData?.benefits.map(
                        (benefit: IEmployee) => benefit.name
                    );
                    setSelectedBenefit(benefitNames);

                    setRemark(employeeData?.remark);

                    setTableData(employeeData?.documents);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    // Change value
    const handleGradeChange = (value: string) => {
        setSelectedGrade(value);
    };

    const handleBenefitChange = (value: string[]) => {
        setSelectedBenefit(value);
    };

    const handleRemarkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRemark(e.target.value);
    };

    // Upload Files
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [fileData, setFileData] = useState([]);

    console.log("tableData:", tableData);
    console.log("fileData:", fileData);

    const columns: TableColumnsType<DataType> = [
        {
            title: "No",
            dataIndex: "id",
            key: "id",
            className: "addnew__other-column",
            render: (_, __, index) => (
                <span style={{ textAlign: "center" }}>{++index}</span>
            ),
        },
        {
            title: "Document Name",
            dataIndex: "name",
            key: "name",
            className: "addnew__other-column",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            className: "addnew__other-column",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record) => (
                <a
                    className="addnew__other-delete"
                    onClick={() => handleDeleteRow(record)}
                >
                    <DeleteOutlined /> Delete
                </a>
            ),
            className: "addnew__other-column",
        },
    ];

    const handleUploadDocument = (file) => {
        const newData: DataType = {
            id: file.uid,
            name: file.name,
            created_at: new Date().toLocaleString(),
        };

        setTableData([...tableData, newData]);
        setFileData([...fileData, file.originFileObj]);
    };

    const handleDeleteRow = (record: DataType) => {
        const newData = tableData.filter((item) => item.id !== record.id);
        setTableData(newData);

        const recordId = record.id;
        setDeleteIds([...deleteIds, recordId]);
    };

    const props: UploadProps = {
        name: "file",
        accept: "image/*,.pdf,.csv,.xlsx,.docx",
        multiple: true,
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        showUploadList: false,
        beforeUpload(file, fileList) {
            const totalFiles = fileList.length + tableData.length;
            if (totalFiles > 10) {
                message.error("The total number of files cannot exceed 10!");
                return false;
            }
            return true;
        },
        onChange(info) {
            if (info.file && info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                handleUploadDocument(info.file);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    // handleOtherChange
    const newValues = useMemo(
        () => ({
            grade_id: parseInt(selectedGrade),
            benefits: selectedBenefit,
            remark: remark,
            documents: fileData,
        }),
        [selectedGrade, selectedBenefit, remark, fileData]
    );

    useEffect(() => {
        handleOtherChange(newValues);
    }, [newValues, handleOtherChange]);

    // Delete benefit when grade change
    // useEffect(() => {
    //     setSelectedBenefit([]);
    // }, [selectedGrade]);

    return (
        <div className="addnew-container">
            <div className="addnew__header">
                <h2 className="addnew__header-heading">Others</h2>
                <p className="addnew__header-desc">
                    Required (<span className="required">*</span>)
                </p>
            </div>
            <div className="addnew__header-line"></div>

            <div className="addnew__other">
                <div className="addnew__other-input-box">
                    <label htmlFor="grade" className="addnew__other-label">
                        Grade
                    </label>
                    <Select
                        id="grade"
                        value={selectedGrade}
                        onChange={handleGradeChange}
                        allowClear
                        listHeight={320}
                        size={"large"}
                    >
                        {grades.map((grade) => (
                            <Select.Option
                                key={grade.id}
                                value={grade.id.toString()}
                            >
                                {grade.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                <div className="addnew__other-input-box">
                    <label htmlFor="benefits" className="addnew__other-label">
                        Benefit
                    </label>
                    <Select
                        id="benefits"
                        value={selectedBenefit}
                        onChange={handleBenefitChange}
                        mode="multiple"
                        allowClear
                        size={"large"}
                    >
                        {benefits.map((benefit) => (
                            <Select.Option
                                key={benefit.id}
                                value={benefit.id.toString()}
                            >
                                {benefit.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="addnew__other-input-box">
                    <label htmlFor="remark" className="addnew__other-label">
                        Remark
                    </label>
                    <textarea
                        id="remark"
                        name="remark"
                        className="addnew__other-textarea"
                        value={remark}
                        onChange={handleRemarkChange}
                    />
                </div>
                <div className="addnew__other-input-box">
                    <label htmlFor="users" className="addnew__other-label">
                        HRM User Account
                    </label>

                    <Select id="users" size={"large"} listHeight={420}>
                        {users.map((user) => (
                            <Select.Option
                                key={user.id}
                                value={user.id.toString()}
                            >
                                {user.username}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="addnew__other-document">
                <div className="addnew__other-upload">
                    <h2 className="addnew__other-heading">Document</h2>
                    <Upload {...props}>
                        <Button
                            icon={<UploadOutlined />}
                            className="addnew__other-button"
                            disabled={tableData.length > 9}
                        >
                            Upload
                        </Button>
                    </Upload>
                </div>
                <Table
                    size="small"
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className="addnew__other-table"
                />
            </div>
        </div>
    );
};

export default Others;
