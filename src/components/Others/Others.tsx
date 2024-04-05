import React, { useEffect, useState } from "react";

import { Button, Table, Upload, message } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import type { TableColumnsType, UploadProps } from "antd";
import CrossX from "../../assets/icons/cross.png";
import "./others.css";

import { IGrade } from "../../interfaces/grade-interface";
import { IBenefit } from "../../interfaces/benefit-interface";
import { benefitApi, gradeApi, userApi } from "../../services/user-services";
import { IUser } from "../../interfaces/user-interface";

const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: "No",
        dataIndex: "name",
        key: "name",
        className: "addnew__other-column",
    },
    {
        title: "Document Name",
        dataIndex: "age",
        key: "age",
        className: "addnew__other-column",
    },
    {
        title: "Created At",
        dataIndex: "address",
        key: "address",
        className: "addnew__other-column",
    },
    {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => (
            <a className="addnew__other-delete">
                <DeleteOutlined /> Delete
            </a>
        ),
        className: "addnew__other-column",
    },
];

const data: DataType[] = [
    {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
    },
    {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
    },
    {
        key: 3,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
    },
    {
        key: 4,
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
];

const Others = () => {
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [benefits, setBenefits] = useState<IBenefit[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const [selectedGrade, setSelectedGrade] = useState<string>("");
    const [selectedBenefit, setSelectedBenefit] = useState<string>("");

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
                usersRes.data
            ) {
                setGrades(gradesRes.data);
                setBenefits(benefitsRes.data);
                setUsers(usersRes.data.data);
            } else {
                console.error("No data returned from API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setSelectedBenefit("");
    }, [selectedGrade]);

    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGrade = e.target.value;
        setSelectedGrade(selectedGrade);
    };

    const handleBenefitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBenefit = e.target.value;
        setSelectedBenefit(selectedBenefit);
    };

    const handleDeleteGrade = () => {
        setSelectedGrade("");
    };

    const handleDeleteBenefit = () => {
        setSelectedBenefit("");
    };

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
                    <label htmlFor="name" className="addnew__other-label">
                        Grade
                    </label>
                    <select
                        name="gender"
                        className="addnew__other-select"
                        value={selectedGrade}
                        onChange={handleGradeChange}
                    >
                        <option value="" disabled hidden></option>
                        {grades.map((grade) => (
                            <option key={grade.id} value={grade.id}>
                                {grade.name}
                            </option>
                        ))}
                    </select>
                    <div
                        className={
                            selectedGrade
                                ? "addnew__other-delete-button"
                                : "addnew__other-delete-button disabled"
                        }
                    >
                        <div onClick={() => handleDeleteGrade()}>
                            <img src={CrossX} alt="" />
                        </div>
                    </div>
                </div>
                <div className="addnew__other-input-box">
                    <label htmlFor="name" className="addnew__other-label">
                        Benefit
                    </label>
                    <select
                        name="gender"
                        className="addnew__other-select"
                        value={selectedBenefit}
                        onChange={handleBenefitChange}
                    >
                        <option value="" disabled hidden></option>
                        {benefits.map((benefit) => (
                            <option key={benefit.id} value={benefit.id}>
                                {benefit.name}
                            </option>
                        ))}
                    </select>
                    <div
                        className={
                            selectedBenefit
                                ? "addnew__other-delete-button"
                                : "addnew__other-delete-button disabled"
                        }
                    >
                        <div onClick={() => handleDeleteBenefit()}>
                            <img src={CrossX} alt="" />
                        </div>
                    </div>
                </div>
                <div className="addnew__other-input-box">
                    <label htmlFor="name" className="addnew__other-label">
                        Remark
                    </label>
                    <textarea className="addnew__other-textarea" />
                </div>
                <div className="addnew__other-input-box">
                    <label htmlFor="name" className="addnew__other-label">
                        HRM User Account
                    </label>
                    <select
                        name="gender"
                        className="addnew__other-select"
                        defaultValue={"1"}
                    >
                        <option value="1" disabled hidden></option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="addnew__other-document">
                <div className="addnew__other-upload">
                    <h2 className="addnew__other-heading">Document</h2>
                    <Upload {...props}>
                        <Button
                            icon={<UploadOutlined />}
                            className="addnew__other-button"
                        >
                            Upload
                        </Button>
                    </Upload>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="addnew__other-table"
                />
            </div>
        </div>
    );
};

export default Others;
