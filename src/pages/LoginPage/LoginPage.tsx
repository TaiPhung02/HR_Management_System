import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./loginPage.css";

const LoginPage = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="login-page">
      {isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
    </div>
  );
};

export default LoginPage;
