import React from "react";
import CeroCincoPresentation from "../../components/login/CeroCincoPresentation";
import LoginForm from "../../components/login/LoginForm";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <CeroCincoPresentation/>
      <LoginForm/>
    </div>
  );
}

export default Login;