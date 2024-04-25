import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .max(30, "Username must be at most 30 characters")
        .matches(
            /^[\w.]+$/,
            "Username can only contain letters, numbers, and periods"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must be at most 16 characters"),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    // ),
    factory: Yup.string().required("Factory is required"),
});

export const forgotPasswordValidation = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email address"
        ),
});

export const changePasswordValidation = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Minimum eight characters, at least one letter, one number and one special character"
        ),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const employeeInformationValidation = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .max(30, "Name must be at most 30 characters"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("Date of birthday is required"),
    ktp_no: Yup.string().required("KTP No. is required"),
    type: Yup.string().required("Type Employee is required"),
    contract_start_date: Yup.string().required(
        "Contract Start Date is required"
    ),
});

export const employmentDetailsSchema = Yup.object().shape({
    hidden_on_payroll: Yup.boolean()
        .oneOf([true], "You must accept the Hidden On Payroll")
        .required("You must accept the Hidden On Payroll"),
});

export const salaryWagesValidation = Yup.object().shape({
    basic_salary: Yup.number()
        .min(0, "Please input value min is 0")
        .required("This field is required"),
    audit_salary: Yup.number()
        .min(0, "Please input value min is 0")
        .required("This field is required"),
    health_insurance: Yup.number()
        .min(0, "Please input value min is 0")
        .required("This field is required"),
    meal_allowance: Yup.number()
        .min(0, "Please input value min is 0")
        .required("This field is required"),
    safety_insurance: Yup.number()
        .min(0, "Please input value min is 0")
        .required("This field is required"),
});
