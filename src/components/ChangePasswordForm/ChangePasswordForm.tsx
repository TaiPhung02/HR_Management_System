import { useState } from "react";
import { useFormik } from "formik";

import "./changePasswordForm.css";
import { changePasswordValidation } from "../../utils/validate-utils";
import { changePasswordPGApi } from "../../services/user-services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const initialValues = {
  password: "",
  confirmPassword: "",
};
const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: changePasswordValidation,
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          await changePasswordPGApi(
            "admin_test1@yopmail.com",
            1,
            values.password,
            values.confirmPassword
          );
          toast.success("Password changed successfully!");
          localStorage.clear();
          dispatch(logout());

          navigate("/login");
        } catch (error) {
          toast.error("Error Password changed: " + error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <>
      <div className="change-wrapper">
        <h2 className="logo__title">Settings</h2>

        <form
          action=""
          autoComplete="off"
          onSubmit={handleSubmit}
          className="change-form"
        >
          <h2 className="change__title">Change Password</h2>
          <div className="change-line"></div>
          <div className="change__input-box">
            <label htmlFor="password" className="change__label">
              New Password
            </label>
            <div className="login__input-password">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                className={
                  errors.password && touched.password
                    ? "change__input error"
                    : "change__input"
                }
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className={
                  values.password
                    ? "toggle-password"
                    : "toggle-password disable"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>
            {touched.password && errors.password && (
              <p className="login__message-error">{errors.password}</p>
            )}
          </div>

          <div className="change__input-box">
            <label htmlFor="password" className="change__label">
              Confirm Password
            </label>
            <div className="login__input-password">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="off"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "change__input error"
                    : "change__input"
                }
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className={
                  values.confirmPassword
                    ? "toggle-password"
                    : "toggle-password disable"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>

            {touched.confirmPassword && errors.confirmPassword && (
              <p className="login__message-error">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className={isLoading ? "change__btn disabled" : "change__btn"}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              "Confirm"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
