interface InputFieldProps {
  label?: string;
  required?: boolean;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}) => {
  const inputClassName = disabled
    ? "addnew__employee-input disabled"
    : touched && error
    ? "addnew__employee-input error"
    : "addnew__employee-input";

  return (
    <div className="addnew__employee-input-box">
      <label htmlFor={name} className="addnew__employee-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="addnew__employee-input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          className={inputClassName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {touched && error && <p className="login__message-error">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
