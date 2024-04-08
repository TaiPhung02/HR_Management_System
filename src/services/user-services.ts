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

export const addNewEmployeeApi = (employeeData: IEmployee) => {
    const {
        name,
        gender,
        dob,
        ktp_no,
        type,
        contract_start_date,
        hidden_on_payroll,
        //
        card_number,
        bank_account_no,
        family_card_number,
        marriage_code,
        mother_name,
        pob,
        home_address_1,
        home_address_2,
        // 
        entitle_ot,
        meal_allowance_paid,
        // 
        grade_id,
        // 
        department_id,
        position_id
    } = employeeData;

    return pgApi.post("employee", {
        name,
        gender,
        dob,
        ktp_no,
        type,
        contract_start_date,
        hidden_on_payroll,
        //
        card_number,
        bank_account_no,
        family_card_number,
        marriage_code,
        mother_name,
        pob,
        home_address_1,
        home_address_2,
        // 
        entitle_ot,
        meal_allowance_paid,
        // 
        grade_id,
        // 
        department_id,
        position_id
    });
};

export const deleteEmployeeApi = (recordIds: number[]) => {
    return pgApi.delete("employee/multiple-delete", {
        data: {
            record_ids: recordIds,
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
