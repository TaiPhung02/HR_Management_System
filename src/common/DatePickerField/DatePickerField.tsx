import React from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerFieldProps {
    label?: string;
    required?: boolean;
    name?: string;
    value?: string | Dayjs | null;
    onChange?: (date: Dayjs | null) => void;
    onBlur?: (e: React.FocusEvent<unknown>) => void;
    error?: string;
    touched?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
    label,
    required,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
}) => {
    const formattedValue = value ? dayjs(value, "YYYY-MM-DD") : null;

    const handleDateChange = (date: Dayjs | null): void => {
        onChange && onChange(date);
    };

    return (
        <div className="addnew__employee-input-box">
            <label htmlFor={name} className="addnew__employee-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <div className="addnew__employee-input-wrapper">
                <DatePicker
                    id={name}
                    name={name}
                    className={
                        error && touched
                            ? "addnew__employee-date-box error"
                            : "addnew__employee-date-box"
                    }
                    value={formattedValue}
                    onChange={handleDateChange}
                    onBlur={onBlur}
                />
                {touched && error && (
                    <p className="login__message-error">{error}</p>
                )}
            </div>
        </div>
    );
};

export default DatePickerField;
