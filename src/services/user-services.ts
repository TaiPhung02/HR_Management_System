import { IEmployee } from "../interfaces/employee-interface";
import { pgApi } from "./customize-axios";

export const loginPGApi = (
  username: string,
  password: string,
  company_id: string
) => {
  return pgApi.post("login", { username, password, company_id });
};
export const forgotPGApi = (email: string) => {
  return pgApi.post("forgot-password", { email });
};

export const changePasswordPGApi = (
  email: string,
  company_id: number,
  password: string,
  password_confirmation: string
) => {
  return pgApi.post("change-password", {
    email,
    company_id,
    password,
    password_confirmation,
  });
};

export const companyApi = () => {
  return pgApi.get("company");
};

export const employeeApi = (page: number, size: number) => {
  return pgApi.get(`employee?page=${page}&size=${size}`);
};

export const searchEmployeeApi = (
  page: number,
  size: number,
  search: string | undefined
) => {
  return pgApi.get(`employee?page=${page}&size=${size}&search=${search}`);
};

export const getEmployeeByIdApi = (recordId: string | undefined) => {
  return pgApi.get(`employee/${recordId}`);
};

export const addNewEmployeeApi = (employeeData: IEmployee) => {
  return pgApi.post("employee", {
    ...employeeData,
  });
};

export const editEmployeeApi = (
  id: string | undefined,
  employeeData: IEmployee
) => {
  return pgApi.put(`employee/${id}`, {
    ...employeeData,
  });
};

export const deleteEmployeeApi = (recordIds: number[]) => {
  return pgApi.delete("employee/multiple-delete", {
    data: {
      record_ids: recordIds,
    },
  });
};

export interface FormDataProps {
  employee_id: string;
  documents: string[] | FormData | undefined;
  deleted_ids: number[];
}

export const uploadDocumentApi = (data: FormDataProps) => {
  return pgApi.post(`employee-document/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const marriageApi = () => {
  return pgApi.get("marriage");
};

export const departmentApi = () => {
  return pgApi.get("department");
};

export const positionApi = () => {
  return pgApi.get("position");
};

export const gradeApi = () => {
  return pgApi.get("grade");
};

export const benefitApi = () => {
  return pgApi.get("benefit");
};

export const userApi = () => {
  return pgApi.get("user");
};
