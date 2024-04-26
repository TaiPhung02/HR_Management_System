import React from "react";
import "./forgotPassword.css";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

const ForgotPassWord = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="forgotPassword">
      {isAuthenticated ? <Navigate to="/" /> : <ForgotPasswordForm />}
    </div>
  );
};

export default ForgotPassWord;
