import React from "react";

interface SelectFieldProps {
    label: string;
    required?: boolean;
    name: string;
    value: number;
    options: { id: number; name: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    touched?: boolean;
    error?: string;
}

const MapSelectField: React.FC<SelectFieldProps> = ({
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
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {touched && error && (
                <p className="login__message-error">{error}</p>
            )}
        </div>
    );
};

export default MapSelectField;
