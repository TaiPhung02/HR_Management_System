export interface IEmployee {
    key?: number;
    id?: number;
    old_staff_id?: string;
    staff_id?: string;
    name?: string;
    gender?: number | string;
    department_id?: number | null;
    company_id?: number;
    marriage_id?: number;
    position_id?: number | null;
    type?: string;
    mother_name?: string;
    dob?: string;
    pob?: string;
    ktp_no?: string;
    nc_id?: string;
    home_address_1?: string;
    home_address_2?: string | null;
    mobile_no?: string;
    tel_no?: string | null;
    bank_account_no?: string | null;
    bank_name?: string;
    card_number?: string | null;
    family_card_number?: string;
    health_insurance_no?: string | null;
    safety_insurance_no?: string | null;
    education_background?: string | null;
    emergency_contract?: string | null;
    emergency_relationship?: string | null;
    emergency_name?: string | null;
    basic_salary?: string | null;
    audit_salary?: string | null;
    health_insurance?: string | null;
    safety_insurance?: string | null;
    safety_insurance_audit?: string | null;
    health_insurance_audit?: string | null;
    meal_allowance?: string | null;
    entitle_ot?: number;
    meal_allowance_paid?: number;
    operational_allowance_paid?: number;
    attendance_allowance_paid?: number;
    minimum_salary_used?: string;
    hidden_on_payroll?: number;
    contract_start_date?: string;
    resign_reason?: string | null;
    resign_effective_date?: string | null;
    resign_date?: string | null;
    shift?: string;
    grade_id?: number | null;
    remark?: string | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    department_name?: string;
    marriage_code?: string;
    position_name?: string | null;
    grade_prefix?: string | null;
    grade_name?: string | null;
    contracts?: string | null;
    users?: string | null;
    allowed_to_view_salary?: number;
}