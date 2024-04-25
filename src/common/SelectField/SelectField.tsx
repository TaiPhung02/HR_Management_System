import React from "react";

interface Option {
    value: string;
    label: string;
}
interface SelectFieldProps {
    label?: string;
    required?: boolean;
    name?: string;
    value?: string;
    options: Option[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    touched?: boolean;
    error?: string | undefined;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    required,
    name,
    value,
    options,
    onChange,
    onBlur,
    touched,
    error,
}) => {
    return (
        <div className="addnew__employee-input-box">
            <label htmlFor={name} className="addnew__employee-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <div className="addnew__employee-input-wrapper">
                <select
                    id={name}
                    name={name}
                    className={
                        touched && error
                            ? "addnew__employee-select error"
                            : "addnew__employee-select"
                    }
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    <option value="" hidden>
                        Choose {label}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {touched && error && (
                    <p className="login__message-error">{error}</p>
                )}
            </div>
        </div>
    );
};

export default SelectField;
