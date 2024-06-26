import { useEffect, useState } from "react";
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
  FormDataProps,
  getEmployeeByIdApi,
  uploadDocumentApi,
} from "../../services/user-services";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../interfaces/employee-interface";
// import { PiWarningCircle } from "react-icons/pi";
import { ISalaryWages } from "../../interfaces/salaryWages-interface";
import { RcFile } from "antd/es/upload";

const AddNewEmployee = () => {
  // Check id
  const [checkId, setCheckId] = useState(false);
  // Get params
  const { id } = useParams<{ id?: string | undefined }>();
  // check id in URL
  const isEditMode = !!id;
  // Navigate
  const navigate = useNavigate();
  // State EmployeeInformation
  const [employeeInfo, setEmployeeInfo] = useState<IEmployee>({});
  // State EmployeeDetails
  const [employmentDetails, setEmploymentDetails] = useState<IEmployee>({});
  // State SalaryWages
  const [salaryWages, setSalaryWages] = useState<ISalaryWages>({});
  // State Others
  const [others, setOthers] = useState<IEmployee>({});
  // State Button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [isErrorsField, setIsErrorsField] = useState(false);
  const [isValidInfor, setIsValidInfor] = useState(false);

  //
  const [deleteIds, setDeleteIds] = useState([]);

  // console.log(deleteIds);

  // Check button
  useEffect(() => {
    setIsButtonDisabled(
      !(
        employeeInfo &&
        employeeInfo.name &&
        employeeInfo.gender &&
        employeeInfo.dob &&
        employeeInfo.ktp_no &&
        employeeInfo.type &&
        employeeInfo.contract_start_date
      )
    );
  }, [employeeInfo]);

  // Check id
  useEffect(() => {
    const checkId = async () => {
      try {
        const checkIdRes = await getEmployeeByIdApi(id);

        if (
          isEditMode &&
          checkIdRes &&
          checkIdRes.data &&
          checkIdRes.data.message === "Data not found"
        ) {
          setCheckId(false);
          toast.error(checkIdRes.data.message);
        } else {
          setCheckId(true);
        }
      } catch (error) {
        console.error("Error checking ID:", error);
      }
    };
    checkId();
  }, [id, isEditMode]);

  // handleUpload in OthersTab
  const handleDocumentUpload = async (
    employeeId: string,
    documentFormData: FormData | string[] | RcFile[] | undefined,
    deleteIds: number[]
  ) => {
    const data: FormDataProps = {
      employee_id: employeeId,
      documents: documentFormData,
      deleted_ids: deleteIds,
    };
    try {
      const response = await uploadDocumentApi(data);

      console.log("Upload document response:", response);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  // Handle Add
  const handleAddNewEmployee = async () => {
    try {
      const res = await addNewEmployeeApi({
        ...employeeInfo,
        ...employmentDetails,
        ...salaryWages,
        ...others,
      });

      // if (res && res.result === true) {
      if (res) {
        handleDocumentUpload(res.data.id, others.documents, deleteIds);

        toast.success("Record added");

        setEmployeeInfo({});
        setEmploymentDetails({});
        setSalaryWages({});
        setOthers({});

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
    if (id) {
      try {
        const res = await editEmployeeApi(id, {
          ...employeeInfo,
          ...employmentDetails,
          ...salaryWages,
          ...others,
        });

        // if (res && res.result === true) {
        if (res) {
          handleDocumentUpload(id, others.documents, deleteIds);
          setDeleteIds([]);

          window.history.back();
          toast.success("Change saved");
        } else {
          toast.error("Failed to edit employee. Please try again later.");
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "An error occurred while editing employee. Please try again later."
        );
      }
    }
  };

  // change tabs
  const onChange = (key: string) => {
    console.log(key);
  };

  // EmployeeInformation
  const handleEmployeeInfoChange = (values: IEmployee) => {
    // console.log("EmployeeInfoChange:", values);
    setEmployeeInfo(values);
  };
  // EmployeeDetail
  const handleEmploymentDetailsChange = (values: IEmployee) => {
    // console.log("EmploymentDetailsChange:", values);
    setEmploymentDetails(values);
  };

  // SalaryWages
  const handleSalaryWagesChange = (values: ISalaryWages) => {
    // console.log("SalaryWagesChange:", values);
    setSalaryWages(values);
  };

  // Other
  const handleOtherChange = (values: IEmployee) => {
    // console.log("OthersChange:", values);
    // console.log(deleteIds);
    setOthers(values);
  };

  const checkIsValidInfor = (isValidInfor: boolean) => {
    if (isValidInfor) {
      setIsValidInfor(true);
    } else {
      setIsValidInfor(false);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table__header">
        <h1 className="table__header-heading">Employee Management</h1>
        <Button
          className={isEditMode ? "addNew__cta-save" : "addNew__cta-add"}
          onClick={isEditMode ? handleEditEmployee : handleAddNewEmployee}
          disabled={
            isEditMode ? !checkId && isButtonDisabled : isButtonDisabled
          }
        >
          {isEditMode ? "Save Change" : "Add"}
        </Button>
      </div>
      <Tabs
        size="large"
        type="card"
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: !isValidInfor
              ? "Employee Information "
              : "Employee Information",
            key: "1",
            children: (
              <EmployeeInformation
                handleEmployeeInfoChange={handleEmployeeInfoChange}
                checkIsValidInfor={checkIsValidInfor}
              />
            ),
          },
          {
            label: "Contract Information",
            key: "2",
            children: <ContractInformation />,
          },
          {
            label: "Employment Details",
            key: "3",
            children: (
              <EmploymentDetails
                handleEmploymentDetailsChange={handleEmploymentDetailsChange}
              />
            ),
          },
          {
            label: "Salary & Wages",
            key: "4",
            children: (
              <SalaryWages handleSalaryWagesChange={handleSalaryWagesChange} />
            ),
          },
          {
            label: "Others",
            key: "5",
            children: (
              <Others
                handleOtherChange={handleOtherChange}
                deleteIds={deleteIds}
                setDeleteIds={setDeleteIds}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AddNewEmployee;
