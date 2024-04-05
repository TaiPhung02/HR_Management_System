export interface IUser {
    id: number;
    username: string;
    email: string;
    role_id: number;
    level: number;
    employee_id: number | null;
    department_id: number;
    company_id: string;
    register_token: string | null;
}
